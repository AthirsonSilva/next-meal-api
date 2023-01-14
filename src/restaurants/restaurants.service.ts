import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '@src/prisma.service'
import { scrypt as _scrypt, randomBytes } from 'crypto'
import { CnpjParser } from 'helpers/cnpj-parser'
import { RestaurantAlreadyExists } from 'helpers/restaurant-already-exists'
import { promisify } from 'util'
import { PhoneParser } from './../../helpers/phone-parser'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'

@Injectable()
export class RestaurantsService {
	constructor(private prisma: PrismaService) {}

	async create(data: Prisma.restaurantsCreateInput) {
		try {
			let { cnpj, phone, password } = data
			phone = new PhoneParser(phone).parse()
			cnpj = new CnpjParser(cnpj).parse()

			const scrypt = promisify(_scrypt) as (
				password: string,
				salt: string,
				length: number,
			) => Promise<string | Buffer>
			const salt = randomBytes(8).toString('hex')
			const hash = (await scrypt(password, salt, 16)) as Buffer
			password = `${salt}.${hash.toString('hex')}`

			const restaurantExists = await new RestaurantAlreadyExists(
				this.prisma,
			).check(data.email, cnpj, phone)

			if (cnpj.length !== 14) throw new BadRequestException('Invalid CNPJ')

			if (phone.length > 20 || phone.length < 8)
				throw new BadRequestException('Invalid Phone number')

			if (restaurantExists !== false) {
				throw new BadRequestException(
					`A restaurant with this ${restaurantExists} already exists`,
				)
			}

			Object.assign(data, {
				cnpj,
				phone,
				password,
				is_full: false,
				kitchens: {
					connect: {
						id: data.kitchens,
					},
				},
				addresses: {
					create: {
						...data.addresses,
					},
				},
				created_at: new Date(),
				updated_at: new Date(),
			})

			return this.prisma.restaurants.create({
				data,
			})
		} catch (error) {
			if (error instanceof BadRequestException)
				throw new BadRequestException(error.message)

			throw new BadRequestException('Something went wrong')
		}
	}

	findAll() {
		return `This action returns all restaurants`
	}

	findOne(id: number) {
		return `This action returns a #${id} restaurant`
	}

	update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
		return `This action updates a #${id} restaurant`
	}

	remove(id: number) {
		return `This action removes a #${id} restaurant`
	}
}
