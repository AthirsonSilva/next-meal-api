import { Test, TestingModule } from '@nestjs/testing'
import { CreateDummyClient } from '../../../../helpers/create-dummy-client'
import { PrismaService } from '../../../prisma.service'
import { UsersService } from '../../users.service'

describe('Update user service', () => {
	let service: UsersService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersService, PrismaService],
		}).compile()

		service = module.get<UsersService>(UsersService)
	})

	it('should update a user', async () => {
		await new CreateDummyClient(service).execute().then(async (user) => {
			await service
				.update(
					{ id: user.id },
					{
						name: 'New name',
					},
				)
				.then((userUpdate) => {
					expect(userUpdate.name).toBe('New name')
				})
		})
	})

	it('should not update a user without providing an unique value', async () => {
		await service
			.update(
				{
					id: 1210231231,
				},
				{
					name: 'New name',
				},
			)
			.catch((error) => {
				expect(error).toBeDefined()
			})
	})
})
