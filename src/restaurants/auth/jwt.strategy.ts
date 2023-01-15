import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Restaurant } from '../entities/restaurant.entity'
import { RestaurantsService } from './../restaurants.service'
import { jwtConstants } from './constants/constants'

export interface JwtPayload {
	email: string
	sub: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly restaurantsService: RestaurantsService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret,
		})
	}

	async validate(payload: JwtPayload) {
		const { email, sub } = payload
		const restaurant: Restaurant = await this.restaurantsService.findOne({
			email,
		})

		if (!restaurant)
			throw new UnauthorizedException({
				message: 'Invalid credentials',
				status: 401,
				payload: { email, sub },
			})

		return restaurant
	}
}
