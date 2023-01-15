import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing'
import { CreateDummyClient } from '../../../../helpers/create-dummy-client'
import { PrismaService } from '../../../prisma.service'
import { UsersService } from '../../users.service'

describe('Create user service', () => {
	let service: UsersService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersService, PrismaService],
		}).compile()

		service = module.get<UsersService>(UsersService)
	})

	it('it should create a user', async () => {
		await new CreateDummyClient(service).execute().then(async (user) => {
			expect(user).toBeDefined()
		})
	})

	it('it should not create a user with the same email, cpf and phone', async () => {
		const user = await new CreateDummyClient(service).execute()

		await service
			.create({
				email: user.email,
				name: faker.name.firstName(),
				password: faker.internet.password(),
				cpf: user.cpf,
				phone: user.phone,
				photo: faker.image.avatar(),
			})
			.catch((error) => {
				expect(error).toBeDefined()
			})
	})
})
