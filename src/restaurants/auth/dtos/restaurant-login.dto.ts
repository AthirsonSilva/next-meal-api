import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator'

export class RestaurantLoginDto {
	@IsNumber()
	@IsOptional()
	id: number

	@IsEmail()
	email: string

	@IsString()
	password: string
}
