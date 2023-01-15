import { BadRequestException, HttpException, Injectable } from '@nestjs/common'
import { clients as Client, Prisma } from '@prisma/client'
import { cpf as cpfValidator } from 'cpf-cnpj-validator'
import { scrypt as _scrypt, randomBytes } from 'crypto'
import { phoneParser } from 'helpers/phone-parser'
import { userAlreadyExists } from 'helpers/user-already-exists'
import { promisify } from 'util'
import { cpfParser } from '../../helpers/cpf-parser'
import { PrismaService } from '../prisma.service'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async findOne(where: Prisma.clientsWhereUniqueInput): Promise<Client | null> {
		if (where.id) where.id = parseInt(String(where.id))

		return this.prisma.clients.findUnique({
			where: where,
		})
	}

	async findAll(params: {
		skip?: number
		take?: number
		cursor?: Prisma.clientsWhereUniqueInput
		where?: Prisma.clientsWhereInput
		orderBy?: Prisma.clientsOrderByWithRelationInput
	}): Promise<Client[]> {
		const { skip, take, cursor, where, orderBy } = params
		return this.prisma.clients.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
		})
	}

	async create(data: Prisma.clientsCreateInput): Promise<Client> {
		try {
			let { cpf, phone, password } = data

			cpf = cpfParser(cpf)
			phone = phoneParser(phone)

			const scrypt = promisify(_scrypt) as (
				password: string,
				salt: string,
				length: number,
			) => Promise<string | Buffer>
			const salt = randomBytes(8).toString('hex')
			const hash = (await scrypt(password, salt, 16)) as Buffer
			password = `${salt}.${hash.toString('hex')}`

			const userExists = await userAlreadyExists(this.prisma, {
				email: data.email,
				cpf,
				phone,
			})

			if (cpf.length !== 11 || cpfValidator.isValid(cpf))
				throw new BadRequestException('Invalid CPF')

			if (phone.length > 20 || phone.length < 8)
				throw new BadRequestException('Invalid Phone number')

			if (userExists !== false) {
				throw new BadRequestException(
					`A user with this ${userExists} already exists`,
				)
			}

			Object.assign(data, { cpf, phone, password })

			return this.prisma.clients.create({
				data,
			})
		} catch (error) {
			throw new HttpException(
				error.message || 'Something went wrong',
				error.status || 500,
			)
		}
	}

	async update(
		where: Prisma.clientsWhereUniqueInput,
		data: UpdateUserDto,
	): Promise<Client> {
		if (where.id) where.id = Number(where.id)

		const result = await this.prisma.clients
			.findFirst({
				where,
			})
			.then((user) => {
				if (!user) throw new BadRequestException('User not found')

				Object.assign(user, {
					...data,
					cpf: cpfParser(data.cpf ?? user.cpf),
					phone: phoneParser(data.phone ?? user.phone),
					updated_at: new Date(),
				})

				return user
			})

		return this.prisma.clients.update({
			where,
			data: result,
		})
	}

	async remove(where: Prisma.clientsWhereUniqueInput): Promise<Client> {
		if (where.id) where.id = Number(where.id)

		return this.prisma.clients.delete({
			where,
		})
	}
}
