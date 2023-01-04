import { PrismaClient } from '@prisma/client'
import { clientsSeeder } from './clients.seeder'
import { mealsSeeder } from './meals.seeder'
import { ratingsSeeder } from './ratings.seeder'
import { reservationsSeeder } from './reservations.seeder'
import { restaurantsSeeder } from './restaurants.seeder'

const prisma = new PrismaClient()

async function main() {
	await clientsSeeder()
	await restaurantsSeeder()
	await mealsSeeder()
	await ratingsSeeder()
	await reservationsSeeder()
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
