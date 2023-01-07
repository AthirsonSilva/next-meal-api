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
	create(@Body() createRestaurantDto: CreateRestaurantDto) {
		return this.restaurantsService.create(createRestaurantDto)
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
