import { PrismaClient } from '@prisma/client'

export class RestaurantAlreadyExists {
	private prisma: PrismaClient

	constructor(prisma: PrismaClient) {
		this.prisma = prisma
	}

	async check(email?: string, cnpj?: string, phone?: string, name?: string) {
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
					{
						name,
					},
				],
			},
		})

		if (restaurant) {
			if (restaurant.email === email) return 'email'
			if (restaurant.cnpj === cnpj) return 'cnpj'
			if (restaurant.phone === phone) return 'phone'
			if (restaurant.name === name) return 'name'
		}

		return false
	}
}

export const restaurantAlreadyExists = async (
	prisma: PrismaClient,
	params: { email?: string; cnpj?: string; phone?: string; name?: string },
) => {
	return await new RestaurantAlreadyExists(prisma).check(
		params.email,
		params.cnpj,
		params.phone,
		params.name,
	)
}
