import { BadRequestException, HttpException, Injectable } from '@nestjs/common'
import { clients as Client, Prisma } from '@prisma/client'
import { scrypt as _scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'
import { CpfParser } from '../../helpers/cpf-parser'
import { PhoneParser } from '../../helpers/phone-parser'
import { UserAlreadyExists } from '../../helpers/user-already-exists'
import { PrismaService } from '../prisma.service'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async findUser(
		where: Prisma.clientsWhereUniqueInput,
	): Promise<Client | null> {
		if (where.id) where.id = parseInt(String(where.id))

		return this.prisma.clients.findUnique({
			where: where,
		})
	}

	async findUsers(params: {
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

	async createUser(data: Prisma.clientsCreateInput): Promise<Client> {
		try {
			let { cpf, phone, password } = data

			cpf = new CpfParser(cpf).parse()
			phone = new PhoneParser(phone).parse()

			const scrypt = promisify(_scrypt) as (
				password: string,
				salt: string,
				length: number,
			) => Promise<string | Buffer>
			const salt = randomBytes(8).toString('hex')
			const hash = (await scrypt(password, salt, 16)) as Buffer
			password = `${salt}.${hash.toString('hex')}`

			const userExists = await new UserAlreadyExists(this.prisma).check(
				data.email,
				cpf,
				phone,
			)

			if (cpf.length !== 11) throw new BadRequestException('Invalid CPF')
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

	async updateUser(
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
					cpf: new CpfParser(data.cpf ?? user.cpf).parse(),
					phone: new PhoneParser(data.phone ?? user.phone).parse(),
				})

				return user
			})

		return this.prisma.clients.update({
			where,
			data: result,
		})
	}

	async deleteUser(where: Prisma.clientsWhereUniqueInput): Promise<Client> {
		if (where.id) where.id = Number(where.id)

		return this.prisma.clients.delete({
			where,
		})
	}
}
