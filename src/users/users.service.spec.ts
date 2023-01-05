import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma.service'
import { UsersService } from './users.service'

describe('UsersService', () => {
	let service: UsersService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersService, PrismaService],
		}).compile()

		service = module.get<UsersService>(UsersService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should create a user', async () => {
		const user = await service.createUser({
			email: faker.internet.email(),
			name: faker.name.fullName(),
			cpf: faker.random.numeric(11),
			phone: faker.phone.number('+55 (##) #####-####'),
			password: faker.internet.password(),
			photo: faker.image.imageUrl(),
		})

		expect(user).toBeDefined()
	})
})
