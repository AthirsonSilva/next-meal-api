import { faker } from '@faker-js/faker'
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { clients as ClientModel, Prisma } from '@prisma/client'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		const newUser = await this.usersService.createUser({
			...createUserDto,
			photo: createUserDto.photo || faker.image.avatar(),
		})

		return {
			message: 'User created successfully',
			user: newUser,
		}
	}

	@Get()
	findAll() {
		return this.usersService.findUsers({})
	}

	@Get('post/:id')
	async getPostById(@Param('id') id: string): Promise<ClientModel> {
		return this.usersService.findUser({ id: Number(id) })
	}

	async publishPost(
		@Param('id') id: string,
		data: Prisma.clientsUpdateInput,
	): Promise<ClientModel> {
		return this.usersService.updateUser({
			where: { id: Number(id) },
			data: data,
		})
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.deleteUser({ id: Number(id) })
	}
}
