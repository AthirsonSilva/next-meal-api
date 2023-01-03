import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const tbAvaliacaoSeed = async () => {
	for (let i = 0; i < 10; i++) {
		await prisma.tbavaliacao.create({
			data: {
				idCliente: parseInt(faker.random.numeric(1)),
				idRestaurante: parseInt(faker.random.numeric(1)),
				notaAvaliacao: parseInt(faker.random.numeric(1)),
				descAvaliacao: faker.lorem.words(5),
				dtAvaliacao: faker.date.past(),
				created_at: new Date(),
				updated_at: new Date(),
			},
		})
	}
}
