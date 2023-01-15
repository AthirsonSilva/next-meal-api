import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '@src/prisma.service'
import { cpf as cpfValidator } from 'cpf-cnpj-validator'
import { scrypt as _scrypt, randomBytes } from 'crypto'
import { cnpjParser } from 'helpers/cnpj-parser'
import { phoneParser } from 'helpers/phone-parser'
import { restaurantAlreadyExists } from 'helpers/restaurant-already-exists'
import { promisify } from 'util'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'

@Injectable()
export class RestaurantsService {
	constructor(private prisma: PrismaService) {}

	async create(data: Prisma.restaurantsCreateInput) {
		try {
			let { cnpj, phone, password } = data
			phone = phoneParser(phone)
			cnpj = cnpjParser(cnpj)

			const scrypt = promisify(_scrypt) as (
				password: string,
				salt: string,
				length: number,
			) => Promise<string | Buffer>
			const salt = randomBytes(8).toString('hex')
			const hash = (await scrypt(password, salt, 16)) as Buffer
			password = `${salt}.${hash.toString('hex')}`

			const restaurantExists = await restaurantAlreadyExists(this.prisma, {
				cnpj,
				phone,
				email: data.email,
				name: data.name,
			})

			if (cnpj.length !== 14 || cpfValidator.isValid(cnpj))
				throw new BadRequestException('Invalid CNPJ')

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

	async findAll(params: {
		skip?: number
		take?: number
		cursor?: Prisma.restaurantsWhereUniqueInput
		where?: Prisma.restaurantsWhereInput
		orderBy?: Prisma.restaurantsOrderByWithRelationInput
	}) {
		const restaurants = await this.prisma.restaurants.findMany({
			include: { kitchens: true, addresses: true },
			...params,
		})

		if (restaurants.length === 0)
			throw new NotFoundException('No restaurants found')

		return restaurants
	}

	async findOne(where: Prisma.restaurantsWhereUniqueInput) {
		if (where.id) where.id = parseInt(String(where.id))

		const restaurant = await this.prisma.restaurants.findUnique({
			where,
			include: { kitchens: true, addresses: true },
		})

		if (!restaurant) throw new NotFoundException('Restaurant not found')

		return restaurant
	}

	async update(
		where: Prisma.restaurantsWhereUniqueInput,
		data: UpdateRestaurantDto,
	) {
		if (where.id) where.id = parseInt(String(where.id))

		const restaurant = await this.prisma.restaurants.findUnique({
			where,
		})

		Object.assign(restaurant, {
			...data,
			updated_at: new Date(),
		})

		return this.prisma.restaurants.update({
			where,
			data: restaurant,
		})
	}

	remove(where: Prisma.restaurantsWhereUniqueInput) {
		if (where.id) where.id = parseInt(String(where.id))

		return this.prisma.restaurants.delete({
			where,
		})
	}
}
