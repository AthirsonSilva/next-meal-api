import {
	IsEmail,
	IsOptional,
	IsPhoneNumber,
	IsString,
	Length,
} from 'class-validator'

export class CreateUserDto {
	@IsEmail()
	email: string

	@IsString()
	@Length(6, 20)
	password: string

	@IsString()
	name: string

	@IsString()
	@Length(14, 14)
	cpf: string

	@IsPhoneNumber('BR')
	phone: string

	@IsString()
	@IsOptional()
	photo?: string
}
