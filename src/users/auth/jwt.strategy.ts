import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UsersService } from '@src/users/users.service'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from '../entities/user.entity'
import { jwtConstants } from './constants/constants'

export interface JwtPayload {
	email: string
	sub: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly usersService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret,
		})
	}

	async validate(payload: JwtPayload) {
		const { email, sub } = payload
		const user: User = await this.usersService.findOne({ email })

		if (!user)
			throw new UnauthorizedException({
				message: 'Invalid credentials',
				status: 401,
				payload: { email, sub },
			})

		console.log(user)

		return user
	}
}
