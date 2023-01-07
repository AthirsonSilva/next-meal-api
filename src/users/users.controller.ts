import { faker } from '@faker-js/faker'
import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
} from '@nestjs/common'
import { clients as ClientModel, Prisma } from '@prisma/client'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(
		@Body() createUserDto: CreateUserDto,
	): Promise<{ user: ClientModel; message: string }> {
		const user = await this.usersService.createUser({
			...createUserDto,
			photo: createUserDto.photo || faker.image.avatar(),
		})

		if (!user) throw new BadRequestException('User not created')

		return {
			message: 'User created successfully',
			user,
		}
	}

	@Get()
	async findAll(): Promise<{ users: ClientModel[]; message: string }> {
		const users = await this.usersService.findUsers({})

		if (!users) throw new NotFoundException('Users not found')

		return {
			message: 'Users found successfully',
			users,
		}
	}

	@Get(':id')
	async findUser(
		@Param('id') id: Prisma.clientsWhereUniqueInput,
	): Promise<{ user: ClientModel; message: string }> {
		if (!id) throw new BadRequestException('You must provide an id')

		const user = await this.usersService.findUser(id)

		if (!user) throw new NotFoundException('User not found')

		return {
			message: 'User found successfully',
			user,
		}
	}

	@Patch(':id')
	async updateUser(
		@Param('id') id: Prisma.clientsWhereUniqueInput,
		@Body() data: UpdateUserDto,
	): Promise<{ user: ClientModel; message: string }> {
		if (!id) throw new BadRequestException('You must provide an id')

		const update = await this.usersService.updateUser(id, data)

		if (!update) throw new NotFoundException('User not found')

		return {
			message: 'User updated successfully',
			user: update,
		}
	}

	@Delete(':id')
	async remove(
		@Param('id') id: Prisma.clientsWhereUniqueInput,
	): Promise<{ user: ClientModel; message: string }> {
		if (!id) throw new BadRequestException('You must provide an id')

		const user = await this.usersService.deleteUser(id)

		return {
			message: 'User deleted successfully',
			user,
		}
	}
}
