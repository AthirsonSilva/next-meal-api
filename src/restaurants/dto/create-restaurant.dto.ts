import { Prisma } from '@prisma/client'
import {
	IsBoolean,
	IsDate,
	IsEmail,
	IsNumber,
	IsString,
	IsUrl,
	Length,
} from 'class-validator'

export class CreateRestaurantDto {
	@IsEmail()
	email: string

	@IsString()
	@Length(3, 30)
	name: string

	@IsString()
	@Length(6, 20)
	password: string

	@IsUrl()
	photo: string

	@IsString()
	@Length(14, 14)
	cnpj: string

	@IsString()
	@Length(8, 18)
	phone: string

	@IsDate()
	opening_time: Date

	@IsDate()
	closing_time: Date

	@IsNumber()
	capacity: number

	@IsBoolean()
	is_full: boolean

	@IsString()
	description: string

	@IsNumber()
	kitchens: Prisma.kitchensCreateNestedOneWithoutRestaurantsInput
}
