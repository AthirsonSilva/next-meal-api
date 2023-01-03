import { PrismaClient } from '@prisma/client'
import { tbClienteSeed } from './tbcliente'
import { tbTipoRestauranteSeed } from './tbrestaurante'

const prisma = new PrismaClient()

async function main() {
	await tbClienteSeed()
	await tbTipoRestauranteSeed()
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
