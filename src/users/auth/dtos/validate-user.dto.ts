import { IsEmail, IsString } from 'class-validator'

export class ValidateUserDto {
	@IsEmail()
	email: string

	@IsString()
	password: string
}
