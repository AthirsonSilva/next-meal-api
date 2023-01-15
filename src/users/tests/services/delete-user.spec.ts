import { Test, TestingModule } from '@nestjs/testing'
import { CreateDummyClient } from '../../../../helpers/create-dummy-client'
import { PrismaService } from '../../../prisma.service'
import { UsersService } from '../../users.service'

describe('Delete user service', () => {
	let service: UsersService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersService, PrismaService],
		}).compile()

		service = module.get<UsersService>(UsersService)
	})

	it('should delete a user', async () => {
		await new CreateDummyClient(service).execute().then(async (user) => {
			await service.remove({ id: user.id }).then((userDeleted) => {
				expect(userDeleted).toBeDefined()
			})
		})
	})

	it('should not delete a user without providing an unique value', async () => {
		await service.remove({}).catch((error) => {
			expect(error).toBeDefined()
		})
	})
})
