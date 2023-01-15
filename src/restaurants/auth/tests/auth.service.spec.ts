import { forwardRef } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Test, TestingModule } from '@nestjs/testing'
import { UsersModule } from '../../users.module'
import { AuthService } from '../auth.service'
import { jwtConstants } from '../constants/constants'
import { LocalStrategy } from '../local.strategy'

describe('AuthService', () => {
	let service: AuthService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AuthService, LocalStrategy],
			imports: [
				forwardRef(() => UsersModule),
				PassportModule,
				JwtModule.register({
					secret: jwtConstants.secret,
					signOptions: { expiresIn: '60s' },
				}),
			],
		}).compile()

		service = module.get<AuthService>(AuthService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
