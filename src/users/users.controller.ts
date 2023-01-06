import { faker } from '@faker-js/faker'
import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
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

	@Get(':id')
	async findUser(
		@Param('id') id: Prisma.clientsWhereUniqueInput,
	): Promise<ClientModel> {
		if (!id) throw new BadRequestException('You must provide an id')

		return this.usersService.findUser({ id: Number(id) })
	}

	@Patch(':id')
	async updateUser(
		@Param('id') id: Prisma.clientsWhereUniqueInput,
		@Body() data: UpdateUserDto,
	): Promise<ClientModel> {
		return this.usersService.updateUser({ id: Number(id) }, data)
	}

	@Delete(':id')
	remove(@Param('id') id: Prisma.clientsWhereUniqueInput) {
		return this.usersService.deleteUser({ id: Number(id) })
	}
}
