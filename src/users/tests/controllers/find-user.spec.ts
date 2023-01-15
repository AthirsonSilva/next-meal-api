import { forwardRef } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { CreateDummyClient } from '../../../../helpers/create-dummy-client'
import { PrismaService } from '../../../prisma.service'
import { AuthModule } from '../../auth/auth.module'
import { UsersController } from '../../users.controller'
import { UsersService } from '../../users.service'

describe('Find user controller', () => {
	let controller: UsersController
	let service: UsersService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [forwardRef(() => AuthModule)],
			controllers: [UsersController],
			providers: [UsersService, PrismaService],
		}).compile()

		controller = module.get<UsersController>(UsersController)
		service = module.get<UsersService>(UsersService)
	})

	it('should find a user by id', async () => {
		await new CreateDummyClient(service).execute().then(async (user) => {
			await controller
				.findUser({ id: parseFloat(String(user.id)) })
				.then((response) => {
					expect(response.user).toBeDefined()
					expect(response.message).toEqual('User found successfully')
				})
		})
	})
})
