import { faker } from '@faker-js/faker'
import { clients as Client } from '@prisma/client'
import { UsersService } from '../users.service'

export class CreateDummyClient {
	constructor(private readonly usersRepository: UsersService) {}

	async execute(): Promise<Client> {
		return await this.usersRepository.createUser({
			email: faker.internet.email(),
			name: faker.name.fullName(),
			cpf: faker.random.numeric(11),
			phone: faker.phone.number('+55 (##) #####-####'),
			password: faker.internet.password(),
			photo: faker.image.imageUrl(),
		})
	}
}
