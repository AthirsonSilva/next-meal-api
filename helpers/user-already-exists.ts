import { PrismaClient } from '@prisma/client'

export class UserAlreadyExists {
	private prisma: PrismaClient

	constructor(prisma: PrismaClient) {
		this.prisma = prisma
	}

	async check(params: { email?: string; cpf?: string; phone?: string }) {
		const { email, cpf, phone } = params

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

export const userAlreadyExists = async (
	prisma: PrismaClient,
	params: { email?: string; cpf?: string; phone?: string },
) => {
	return await new UserAlreadyExists(prisma).check(params)
}
