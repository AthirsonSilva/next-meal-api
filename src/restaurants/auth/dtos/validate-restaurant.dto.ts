import { IsEmail, IsString } from 'class-validator'

export class ValidateRestaurantDto {
	@IsEmail()
	email: string

	@IsString()
	password: string
}
