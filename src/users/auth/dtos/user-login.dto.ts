import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator'

export class UserLoginDto {
	@IsOptional()
	@IsNumber()
	id: number

	@IsEmail()
	email: string

	@IsString()
	password: string
}
