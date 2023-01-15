import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { RestaurantsService } from './../restaurants.service'
import { RestaurantLoginDto } from './dtos/restaurant-login.dto'
import { ValidateRestaurantDto } from './dtos/validate-restaurant.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly restaurantsService: RestaurantsService,
		private readonly jwtService: JwtService,
	) {}

	async validateCredentials(body: ValidateRestaurantDto) {
		const restaurant = await this.restaurantsService.findOne({
			email: body.email,
		})

		if (restaurant && restaurant.password === body.password) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...result } = restaurant

			return result
		}

		return null
	}

	async loginWithCredentials(restaurant: RestaurantLoginDto) {
		const payload = { email: restaurant.email, sub: restaurant.id }

		return {
			access_token: this.jwtService.sign(payload),
		}
	}
}
