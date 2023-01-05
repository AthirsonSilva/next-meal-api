import { PartialType } from '@nestjs/mapped-types'
import {
	IsEmail,
	IsOptional,
	IsPhoneNumber,
	IsString,
	Length,
} from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsEmail()
	@IsOptional()
	email: string

	@IsString()
	@Length(6, 20)
	@IsOptional()
	password: string

	@IsString()
	@IsOptional()
	name: string

	@IsString()
	@Length(14, 14)
	@IsOptional()
	cpf: string

	@IsPhoneNumber('BR')
	@IsOptional()
	phone: string
}
