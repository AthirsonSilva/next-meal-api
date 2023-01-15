import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { User } from '../entities/user.entity'
import { AuthService } from './auth.service'
import { ValidateUserDto } from './dtos/validate-user.dto'

type ValidatedUser = Partial<User>

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super()
	}

	async validate(body: ValidateUserDto): Promise<ValidatedUser> {
		console.log('lil body', body)
		const user = await this.authService.validateCredentials(body)

		if (!user) throw new UnauthorizedException('Invalid credentials')

		return user
	}
}
