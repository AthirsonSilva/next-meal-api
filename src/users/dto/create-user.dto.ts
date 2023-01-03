import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator'

export class CreateUserDto {
	@IsEmail()
	emailCliente: string

	@IsString()
	@Length(6, 20)
	senhaCliente: string

	@IsString()
	nomeCliente: string

	@IsString()
	@Length(14, 14)
	cpfCliente: string

	@IsPhoneNumber('BR')
	telefoneCliente: string
}
