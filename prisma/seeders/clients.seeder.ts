import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const clientsSeeder = async () => {
	const azilzor = await prisma.clients.upsert({
		where: { email: 'azilzor@prisma.io' },
		update: {
			created_at: new Date(),
			updated_at: new Date(),
		},
		create: {
			email: 'azilzor@prisma.io',
			name: 'Azilzor',
			password: '123456',
			cpf: '52291070819',
			phone: '11957607177',
			photo: faker.image.avatar(),
			created_at: new Date(),
			updated_at: new Date(),
		},
	})

	console.log({ azilzor })

	for (let i = 0; i < 10; i++) {
		const user = {
			email: faker.internet.email(),
			name: faker.name.firstName(),
			password: faker.internet.password(),
			cpf: faker.random.numeric(11),
			photo: faker.image.avatar(),
			phone: faker.random.numeric(11),
		}

		await prisma.clients.create({
			data: {
				...user,
			},
		})
	}

	console.log('Clients seeded')
}
