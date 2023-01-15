import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users.service'
import { UserLoginDto } from './dtos/user-login.dto'
import { ValidateUserDto } from './dtos/validate-user.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async validateCredentials(body: ValidateUserDto) {
		const user = await this.usersService.findOne({ email: body.email })

		if (user && user.password === body.password) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...result } = user

			return result
		}

		return null
	}

	async loginWithCredentials(user: UserLoginDto) {
		const payload = { email: user.email, sub: user.id }
		console.log(payload)

		return {
			access_token: this.jwtService.sign(payload),
		}
	}
}
