import { Injectable } from '@nestjs/common'
import { clients as Client, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

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
		return this.prisma.clients.create({
			data,
		})
	}

	async updateUser(params: {
		where: Prisma.clientsWhereUniqueInput
		data: Prisma.clientsUpdateInput
	}): Promise<Client> {
		const { where, data } = params
		return this.prisma.clients.update({
			data,
			where,
		})
	}

	async deleteUser(where: Prisma.clientsWhereUniqueInput): Promise<Client> {
		return this.prisma.clients.delete({
			where,
		})
	}
}
