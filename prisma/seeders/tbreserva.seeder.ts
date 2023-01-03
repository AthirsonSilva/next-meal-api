import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const tbReservaSeed = async () => {
	const types = ['Confirmada', 'Finalizada', 'Cancelada', 'Em espera']

	types.forEach(async (type) => {
		await prisma.tbstatusreserva.upsert({
			where: { statusReserva: type },
			update: {
				created_at: new Date(),
				updated_at: new Date(),
			},
			create: {
				statusReserva: type,
				created_at: new Date(),
				updated_at: new Date(),
				tbreserva: {
					create: {
						dataReserva: faker.date.past(),
						horaReserva: faker.date.past(),
						idCliente: parseInt(faker.random.numeric(1)),
						idRestaurante: parseInt(faker.random.numeric(1)),
						numPessoas: parseInt(faker.random.numeric(1)),
						tbmesareserva: {
							create: {
								idMesa: parseInt(faker.random.numeric(1)),
								idMesaReserva: parseInt(faker.random.numeric(1)),
								created_at: new Date(),
								updated_at: new Date(),
							},
						},
					},
				},
			},
		})
	})
}
