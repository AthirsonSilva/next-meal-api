import { PrismaClient } from '@prisma/client'
import { tbAvaliacaoSeed } from './tbavaliacao.seeder'
import { tbClienteSeed } from './tbcliente.seeder'
import { tbPratoSeed } from './tbprato.seeder'
import { tbReservaSeed } from './tbreserva.seeder'
import { tbRestauranteSeed } from './tbrestaurante.seeder'

const prisma = new PrismaClient()

async function main() {
	await tbClienteSeed()
	await tbRestauranteSeed()
	await tbPratoSeed()
	await tbAvaliacaoSeed()
	await tbReservaSeed()
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
