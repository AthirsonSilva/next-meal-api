import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../../../prisma.service'
import { UsersController } from '../../users.controller'
import { UsersService } from '../../users.service'

describe('Find all users controller', () => {
	let controller: UsersController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [UsersService, PrismaService],
		}).compile()

		controller = module.get<UsersController>(UsersController)
	})

	it('Should be able to find all registered users', async () => {
		await controller.findAll().then((response) => {
			expect(response.users).toBeDefined()
			expect(response.message).toEqual('Users found successfully')
		})
	})
})
