import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const restaurantsSeeder = async () => {
	const ragazzo = await prisma.kitchens.upsert({
		where: { kitchen: 'Italiana' },
		update: {
			updated_at: new Date(),
		},
		create: {
			kitchen: 'Italiana',
			photo: faker.image.food(),
			created_at: new Date(),
			updated_at: new Date(),
			restaurants: {
				create: {
					email: 'ragazzo@prisma.io',
					name: 'Ragazzo',
					password: '123456',
					cnpj: '97285476000158',
					phone: '25113168',
					addresses: {
						create: {
							cep: '08420-000',
							city: 'São Paulo',
							neighborhood: 'Guaianazes',
							street: 'Estrada Itaquera Guaianazes',
							state: 'SP',
							created_at: new Date(),
							updated_at: new Date(),
						},
					},
					capacity: 20,
					description: 'Restaurante de comida italiana',
					opening_time: new Date('2021-01-01 12:00:00'),
					closing_time: new Date('2021-01-01 23:00:00'),
					is_full: false,
					photo: faker.image.avatar(),
					desks: {
						create: {
							number: parseInt(faker.random.numeric(1)),
							seats_quantity: parseInt(faker.random.numeric(2)),
							occupation_status: parseInt(faker.random.numeric(1)),
							created_at: new Date(),
							updated_at: new Date(),
						},
					},
					created_at: new Date(),
					updated_at: new Date(),
				},
			},
		},
	})

	console.log(ragazzo)

	for (let i = 0; i < 10; i++) {
		await prisma.kitchens.create({
			data: {
				kitchen: faker.company.name(),
				created_at: new Date(),
				updated_at: new Date(),
				photo: faker.image.imageUrl(),
				restaurants: {
					create: {
						name: faker.company.name(),
						cnpj: faker.random.numeric(14),
						phone: faker.random.numeric(20),
						email: faker.internet.email(),
						password: faker.internet.password(),
						addresses: {
							create: {
								cep: faker.random.numeric(8),
								city: faker.address.city(),
								neighborhood: faker.address.street(),
								street: faker.address.street(),
								state: faker.address.state(),
								created_at: new Date(),
								updated_at: new Date(),
							},
						},
						capacity: parseInt(faker.random.numeric(2)),
						description: faker.lorem.paragraph(),
						opening_time: faker.date.recent(),
						photo: faker.image.imageUrl(),
						closing_time: faker.date.recent(),
						is_full: false,
						desks: {
							create: {
								number: parseInt(faker.random.numeric(1)),
								seats_quantity: parseInt(faker.random.numeric(2)),
								occupation_status: parseInt(faker.random.numeric(1)),

								created_at: new Date(),
								updated_at: new Date(),
							},
						},
						created_at: new Date(),
						updated_at: new Date(),
					},
				},
			},
		})
	}

	console.log('Restaurants seeder done!')
}
