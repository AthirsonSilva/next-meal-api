import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const reservationsSeeder = async () => {
	const types = ['Confirmed', 'Finished', 'Canceled', 'Awaiting']

	types.forEach(async (type) => {
		await prisma.statuses.upsert({
			where: { status: type },
			update: {
				created_at: new Date(),
				updated_at: new Date(),
			},
			create: {
				status: type,
				created_at: new Date(),
				updated_at: new Date(),
				reservations: {
					create: {
						date: faker.date.past(),
						hour: faker.date.past(),
						client: parseInt(faker.random.numeric(1)),
						restaurant: parseInt(faker.random.numeric(1)),
						people_quantity: parseInt(faker.random.numeric(1)),
						created_at: new Date(),
						updated_at: new Date(),
					},
				},
			},
		})
	})

	console.log('Reservations seeded')
}
