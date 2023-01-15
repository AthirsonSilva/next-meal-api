import { faker } from '@faker-js/faker'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Request,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { AuthService } from './auth/auth.service'
import { RestaurantLoginDto } from './auth/dtos/restaurant-login.dto'
import { ValidateRestaurantDto } from './auth/dtos/validate-restaurant.dto'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { LocalStrategy } from './auth/local.strategy'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'
import { Restaurant } from './entities/restaurant.entity'
import { RestaurantsService } from './restaurants.service'

@Controller('restaurants')
export class RestaurantsController {
	constructor(
		private readonly restaurantsService: RestaurantsService,
		private readonly authService: AuthService,
	) {}

	@Post()
	async create(@Body() createRestaurantDto: CreateRestaurantDto) {
		const restaurant = await this.restaurantsService.create({
			...createRestaurantDto,
			photo: createRestaurantDto.photo || faker.image.avatar(),
		})

		return {
			message: 'Restaurant created successfully',
			user: restaurant,
		}
	}

	@Post('login')
	@UseGuards(LocalStrategy)
	async login(
		@Body() request: RestaurantLoginDto,
	): Promise<{ token: string; message: string }> {
		const restaurant = await this.authService.loginWithCredentials(request)

		return {
			message: 'Restaurant logged in successfully',
			token: restaurant.access_token,
		}
	}

	@Get('protected')
	@UseGuards(JwtAuthGuard)
	async protected(
		@Request() request: { restaurant: ValidateRestaurantDto },
	): Promise<{ restaurant: ValidateRestaurantDto; message: string }> {
		return {
			message: 'You are authenticated',
			restaurant: request.restaurant,
		}
	}

	@Get()
	findAll() {
		return this.restaurantsService.findAll({})
	}

	@Get(':id')
	findOne(@Param() id: Prisma.restaurantsWhereUniqueInput) {
		return this.restaurantsService.findOne(id)
	}

	@Patch()
	@UseGuards(JwtAuthGuard)
	update(
		@Request() request: { restaurant: Restaurant },
		@Body() updateRestaurantDto: UpdateRestaurantDto,
	) {
		console.log(request.restaurant)

		if (!request.restaurant.id)
			throw new UnauthorizedException('You are not authenticated')

		const where = {
			id: request.restaurant.id,
		}

		return this.restaurantsService.update(where, updateRestaurantDto)
	}

	@Delete()
	@UseGuards(JwtAuthGuard)
	remove(@Request() request: { restaurant: Restaurant }) {
		console.log(request.restaurant)

		if (!request.restaurant.id)
			throw new UnauthorizedException('You are not authenticated')

		const where = {
			id: request.restaurant.id,
		}

		return this.restaurantsService.remove(where)
	}
}
