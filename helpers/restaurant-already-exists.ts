import { PrismaClient } from '@prisma/client'

export class RestaurantAlreadyExists {
	private prisma: PrismaClient

	constructor(prisma: PrismaClient) {
		this.prisma = prisma
	}

	async check(email?: string, cnpj?: string, phone?: string) {
		const restaurant = await this.prisma.restaurants.findFirst({
			where: {
				OR: [
					{
						email,
					},
					{
						cnpj,
					},
					{
						phone,
					},
				],
			},
		})

		if (restaurant) {
			if (restaurant.email === email) return 'email'
			if (restaurant.cnpj === cnpj) return 'cnpj'
			if (restaurant.phone === phone) return 'phone'
		}

		return false
	}
}
