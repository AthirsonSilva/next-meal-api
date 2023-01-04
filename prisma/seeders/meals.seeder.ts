import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const mealsSeeder = async () => {
	for (let i = 0; i < 10; i++) {
		await prisma.culinary.create({
			data: {
				culinary: faker.random.word(),
				created_at: new Date(),
				updated_at: new Date(),
				photo: faker.image.food(),
				meals: {
					create: {
						name: faker.name.firstName(),
						ingredients: faker.lorem.words(5),
						photo: faker.image.imageUrl(),
						price: parseInt(faker.commerce.price()),
						restaurant: parseInt(faker.random.numeric(1)),
						created_at: new Date(),
						updated_at: new Date(),
					},
				},
			},
		})
	}

	console.log('Meals seeded')
}
