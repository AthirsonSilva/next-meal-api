import { forwardRef } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthModule } from '../../../auth/auth.module'
import { PrismaService } from '../../../prisma.service'
import { UsersController } from '../../users.controller'
import { UsersService } from '../../users.service'
import { CreateDummyClient } from './../../../../helpers/create-dummy-client'

describe('Find all users controller', () => {
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

	it('should delete a user by their id', async () => {
		await new CreateDummyClient(service).execute().then(async (user) => {
			await controller

				.remove({ id: parseFloat(String(user.id)) })
				.then((response) => {
					expect(response.user).toBeDefined()
					expect(response.message).toEqual('User deleted successfully')
				})
		})
	})
})
