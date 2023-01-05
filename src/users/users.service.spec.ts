import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma.service'
import { CreateDummyClient } from './helpers/create-dummy-client'
import { UsersService } from './users.service'

describe('UsersService', () => {
	let service: UsersService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersService, PrismaService],
		}).compile()

		service = module.get<UsersService>(UsersService)
	})

	it('should create a user', async () => {
		await new CreateDummyClient(service)
			.execute()
			.then((user) => expect(user).toBeDefined())
	})

	it('it should find a user by id', async () => {
		await new CreateDummyClient(service).execute().then(async (user) => {
			await service
				.findUser({ id: user.id })
				.then((userFound) => expect(userFound).toBeDefined())
		})
	})
})
