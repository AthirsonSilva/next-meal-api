import { faker } from '@faker-js/faker'
import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	NotFoundException,
	Param,
	Patch,
	Post,
	Request,
	UseGuards,
	forwardRef,
} from '@nestjs/common'
import { clients as ClientModel, Prisma } from '@prisma/client'
import { LocalStrategy } from '@src/auth/local.strategy'
import { AuthService } from './../auth/auth.service'
import { ValidateUserDto } from './../auth/dtos/validate-user.dto'
import { JwtAuthGuard } from './../auth/jwt-auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserLoginDto } from './dto/user-login.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
	) {}

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

	@Get('protected')
	@UseGuards(JwtAuthGuard)
	async protected(
		@Request() request: { user: ValidateUserDto },
	): Promise<{ user: ValidateUserDto; message: string }> {
		return {
			message: 'You are authenticated',
			user: request.user,
		}
	}

	@Post('login')
	@UseGuards(LocalStrategy)
	async login(
		@Body() request: UserLoginDto,
	): Promise<{ user: string; message: string }> {
		const user = await this.authService.loginWithCredentials(request)

		return {
			message: 'User logged in successfully',
			user: user.access_token,
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

		id = { id: Number(id) }

		const user = await this.usersService.findUser(id)

		if (!user) throw new NotFoundException('User not found')

		return {
			message: 'User found successfully',
			user,
		}
	}

	@Patch()
	@UseGuards(JwtAuthGuard)
	async updateUser(
		@Body() data: UpdateUserDto,
		@Request() request: { user: User },
	): Promise<{ user: ClientModel; message: string }> {
		let { id } = request.user

		if (!id) throw new BadRequestException('You must provide an id')

		id = Number(id)

		const update = await this.usersService.updateUser({ id }, data)

		if (!update) throw new NotFoundException('User not found')

		return {
			message: 'User updated successfully',
			user: update,
		}
	}

	@Delete()
	@UseGuards(JwtAuthGuard)
	async remove(
		@Request() request: { user: User },
	): Promise<{ user: ClientModel; message: string }> {
		let { id } = request.user

		if (!id) throw new BadRequestException('You must provide an id')

		id = parseInt(String(id))

		const user = await this.usersService.deleteUser({ id })

		return {
			message: 'User deleted successfully',
			user,
		}
	}
}
