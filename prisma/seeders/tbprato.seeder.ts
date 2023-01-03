import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const tbPratoSeed = async () => {
	for (let i = 0; i < 10; i++) {
		await prisma.tbtipoprato.create({
			data: {
				tipoPrato: faker.random.word(),
				created_at: new Date(),
				updated_at: new Date(),
				tbprato: {
					create: {
						nomePrato: faker.name.firstName(),
						ingredientesPrato: faker.lorem.words(5),
						fotoPrato: faker.image.imageUrl(),
						valorPrato: parseInt(faker.commerce.price()),
						idRestaurante: parseInt(faker.random.numeric(1)),
						created_at: new Date(),
						updated_at: new Date(),
					},
				},
			},
		})
	}
}
