import { PartialType } from '@nestjs/mapped-types'
import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
}
