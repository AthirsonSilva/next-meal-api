import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator'

export class UserLoginDto {
	@IsOptional()
	@IsNumber()
	id: string

	@IsEmail()
	email: string

	@IsString()
	password: string
}
