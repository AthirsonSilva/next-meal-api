/* eslint-disable prettier/prettier */
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const ratingsSeeder = async () => {
	for (let i = 0; i < 10; i++) {
		await prisma.ratings.create({
			data: {
				restaurant: parseInt(faker.random.numeric(1)),
				rating: parseInt(faker.random.numeric(1)),
				comment: faker.lorem.words(5),
				date: faker.date.past(),
				client: parseInt(faker.random.numeric(1)),
				created_at: new Date(),
				updated_at: new Date(),
			},
		})
	}

	console.log('Ratings seeded')
}
