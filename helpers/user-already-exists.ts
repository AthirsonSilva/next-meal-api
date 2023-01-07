import { PrismaClient } from '@prisma/client'

export class UserAlreadyExists {
	private prisma: PrismaClient

	constructor(prisma: PrismaClient) {
		this.prisma = prisma
	}

	async check(email?: string, cpf?: string, phone?: string) {
		const user = await this.prisma.clients.findFirst({
			where: {
				OR: [
					{
						email,
					},
					{
						cpf,
					},
					{
						phone,
					},
				],
			},
		})

		if (user) {
			if (user.email === email) return 'email'
			if (user.cpf === cpf) return 'cpf'
			if (user.phone === phone) return 'phone'
		}

		return false
	}
}
