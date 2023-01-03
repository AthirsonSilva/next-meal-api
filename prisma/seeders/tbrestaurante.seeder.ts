import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const tbRestauranteSeed = async () => {
	for (let i = 0; i < 10; i++) {
		await prisma.tbtiporestaurante.create({
			data: {
				tipoRestaurante: faker.company.name(),
				created_at: new Date(),
				updated_at: new Date(),
				tbrestaurante: {
					create: {
						nomeRestaurante: faker.company.name(),
						cnpjRestaurante: faker.random.numeric(14),
						telRestaurante: faker.random.numeric(20),
						emailRestaurante: faker.internet.email(),
						senhaRestaurante: faker.internet.password(),
						ruaRestaurante: faker.address.street(),
						estadoRestaurante: faker.address.state(),
						cidadeRestaurante: faker.address.city(),
						cepRestaurante: faker.address.zipCode(),
						bairroRestaurante: faker.address.county(),
						capacidadeRestaurante: parseInt(faker.random.numeric(2)),
						descricaoRestaurante: faker.lorem.paragraph(),
						fotoRestaurante: faker.image.imageUrl(),
						horarioAberturaRestaurante: faker.date.recent(),
						horarioFechamentoRestaurante: faker.date.recent(),
						lotacaoRestaurante: false,
						numRestaurante: faker.random.numeric(3),
						tbmesa: {
							create: {
								numMesa: parseInt(faker.random.numeric(1)),
								quantAcentosMesa: parseInt(faker.random.numeric(2)),
								statusMesa: parseInt(faker.random.numeric(1)),
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

	const ragazzo = await prisma.tbrestaurante.upsert({
		where: { emailRestaurante: 'ragazzo@prisma.io' },
		update: {
			created_at: new Date(),
			updated_at: new Date(),
		},
		create: {
			emailRestaurante: 'ragazzo@prisma.io',
			nomeRestaurante: 'Ragazzo',
			senhaRestaurante: '123456',
			cnpjRestaurante: '97285476000158',
			telRestaurante: '25113168',
			ruaRestaurante: 'Estrada Itaquera Guaianazes',
			estadoRestaurante: 'SP',
			cidadeRestaurante: 'São Paulo',
			cepRestaurante: '08420-000',
			bairroRestaurante: 'Guaianazes',
			capacidadeRestaurante: 20,
			descricaoRestaurante: 'Restaurante de comida italiana',
			fotoRestaurante: 'https://i.imgur.com/4ZQZQ0C.jpg',
			horarioAberturaRestaurante: new Date('2021-01-01 12:00:00'),
			horarioFechamentoRestaurante: new Date('2021-01-01 23:00:00'),
			lotacaoRestaurante: false,
			numRestaurante: '0',
			idTipoRestaurante: 1,
			tbmesa: {
				create: {
					numMesa: 1,
					quantAcentosMesa: 4,
					statusMesa: 1,
					created_at: new Date(),
					updated_at: new Date(),
				},
			},
			created_at: new Date(),
			updated_at: new Date(),
		},
	})

	console.log(ragazzo)
}
