import { BadRequestException, Injectable } from '@nestjs/common'
import { clients as Client, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { CpfParser } from './helpers/cpf-parser'
import { PhoneParser } from './helpers/phone-parser'
import { UserAlreadyExists } from './helpers/user-already-exists'

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async findUser(
		userWhereUniqueInput: Prisma.clientsWhereUniqueInput,
	): Promise<Client | null> {
		return this.prisma.clients.findUnique({
			where: userWhereUniqueInput,
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
			let { cpf, phone } = data
			cpf = new CpfParser(cpf).parse()
			phone = new PhoneParser(phone).parse()
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

			Object.assign(data, { cpf, phone })

			return this.prisma.clients.create({
				data,
			})
		} catch (error) {
			throw new BadRequestException(error.message)
		}
	}

	async updateUser(
		where: Prisma.clientsWhereUniqueInput,
		data: UpdateUserDto,
	): Promise<Client> {
		const result = await this.prisma.clients
			.findFirst({
				where,
			})
			.then((user) => {
				if (!user) throw new BadRequestException('User not found')

				Object.assign(user, {
					...data,
				})

				return user
			})

		return this.prisma.clients.update({
			where,
			data: result,
		})
	}

	async deleteUser(where: Prisma.clientsWhereUniqueInput): Promise<Client> {
		return this.prisma.clients.delete({
			where,
		})
	}
}
