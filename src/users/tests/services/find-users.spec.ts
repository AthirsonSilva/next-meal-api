import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../../../prisma.service'
import { UsersService } from '../../users.service'

describe('Find all users service', () => {
	let service: UsersService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersService, PrismaService],
		}).compile()

		service = module.get<UsersService>(UsersService)
	})

	it('should be able to find all registered users', async () => {
		await service.findUsers({}).then((users) => {
			expect(users).toBeDefined()
		})
	})
})
