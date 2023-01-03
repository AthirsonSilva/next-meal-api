import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const tbClienteSeed = async () => {
	const azilzor = await prisma.tbcliente.upsert({
		where: { emailCliente: 'azilzor@prisma.io' },
		update: {
			created_at: new Date(),
			updated_at: new Date(),
		},
		create: {
			emailCliente: 'azilzor@prisma.io',
			nomeCliente: 'Azilzor',
			senhaCliente: '123456',
			cpfCliente: '52291070819',
			telefoneCliente: '11957607177',
			created_at: new Date(),
			updated_at: new Date(),
		},
	})

	console.log({ azilzor })

	for (let i = 0; i < 10; i++) {
		const user = {
			emailCliente: faker.internet.email(),
			nomeCliente: faker.name.firstName(),
			senhaCliente: faker.internet.password(),
			cpfCliente: faker.random.numeric(11),
			telefoneCliente: faker.random.numeric(11),
		}

		await prisma.tbcliente.create({
			data: {
				...user,
			},
		})
	}
}
