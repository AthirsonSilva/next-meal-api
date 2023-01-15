import { Test, TestingModule } from '@nestjs/testing'
import { CreateDummyClient } from '../../../../helpers/create-dummy-client'
import { PrismaService } from '../../../prisma.service'
import { UsersService } from '../../users.service'

describe('Find user service', () => {
	let service: UsersService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersService, PrismaService],
		}).compile()

		service = module.get<UsersService>(UsersService)
	})

	it('it should find a user by id', async () => {
		await new CreateDummyClient(service).execute().then(async (user) => {
			await service
				.findOne({ id: user.id })
				.then((userFound) => expect(userFound).toBeDefined())
		})
	})

	it('it should not find a user without providing an id', async () => {
		await service.findOne({}).catch((error) => {
			expect(error).toBeDefined()
		})
	})
})
