import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { Restaurant } from '../entities/restaurant.entity'
import { AuthService } from './auth.service'
import { ValidateRestaurantDto } from './dtos/validate-restaurant.dto'

type ValidatedRestaurant = Partial<Restaurant>

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super()
	}

	async validate(body: ValidateRestaurantDto): Promise<ValidatedRestaurant> {
		const restaurant = await this.authService.validateCredentials(body)

		if (!restaurant) throw new UnauthorizedException('Invalid credentials')

		return restaurant
	}
}
