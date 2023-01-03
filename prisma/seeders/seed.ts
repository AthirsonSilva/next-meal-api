import { PrismaClient } from '@prisma/client'
import { tbClienteSeed } from './tbcliente.seeder'
import { tbTipoPratoSeed } from './tbprato.seeder'
import { tbTipoRestauranteSeed } from './tbrestaurante.seeder'

const prisma = new PrismaClient()

async function main() {
	await tbClienteSeed()
	await tbTipoRestauranteSeed()
	await tbTipoPratoSeed()
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
