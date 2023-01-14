import { faker } from '@faker-js/faker'
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'
import { RestaurantsService } from './restaurants.service'

@Controller('restaurants')
export class RestaurantsController {
	constructor(private readonly restaurantsService: RestaurantsService) {}

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

	@Get()
	findAll() {
		return this.restaurantsService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.restaurantsService.findOne(+id)
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateRestaurantDto: UpdateRestaurantDto,
	) {
		return this.restaurantsService.update(+id, updateRestaurantDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.restaurantsService.remove(+id)
	}
}
