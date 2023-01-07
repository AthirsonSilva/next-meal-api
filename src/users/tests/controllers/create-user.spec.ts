import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../../../prisma.service'
import { UsersController } from '../../users.controller'
import { UsersService } from '../../users.service'

describe('Create user controller', () => {
	let controller: UsersController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [UsersService, PrismaService],
		}).compile()

		controller = module.get<UsersController>(UsersController)
	})

	it('it should create a user', async () => {
		await controller
			.create({
				email: faker.internet.email(),
				name: faker.name.firstName(),
				cpf: faker.random.numeric(11),
				password: faker.internet.password(),
				phone: faker.phone.number(),
			})
			.then(async (response) => {
				expect(response.user).toBeDefined()
				expect(response.message).toEqual('User created successfully')
			})
	})

	it('it should not create a user with the same email, cpf and phone', async () => {
		await controller
			.create({
				email: faker.internet.email(),
				name: faker.name.firstName(),
				cpf: faker.random.numeric(11),
				password: faker.internet.password(),
				phone: faker.phone.number(),
			})
			.then(async (response) => {
				await controller
					.create({
						email: response.user.email,
						name: faker.name.firstName(),
						cpf: response.user.cpf,
						password: faker.internet.password(),
						phone: response.user.phone,
					})
					.catch((error) => {
						expect(error).toBeDefined()
					})
			})
	})
})
