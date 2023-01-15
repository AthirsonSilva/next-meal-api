import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { Restaurant } from '../entities/restaurant.entity'

@Injectable()
export class SessionSerializer extends PassportSerializer {
	serializeUser(
		restaurant: Restaurant,
		done: (err: Error, restaurant: Restaurant) => void,
	) {
		done(null, restaurant)
	}

	deserializeUser(
		payload: string,
		done: (err: Error, payload: string) => void,
	) {
		done(null, payload)
	}
}
