import { faker } from '@faker-js/faker'
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { UsersService } from './users/users.service'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	constructor(private readonly usersService: UsersService) {
		super()
	}

	async onModuleInit() {
		await this.$connect()
	}

	async enableShutdownHooks(app: INestApplication) {
		this.$on('beforeExit', async () => {
			await app.close()
		})
	}
}
