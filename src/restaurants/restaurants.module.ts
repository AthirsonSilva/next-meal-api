import { Module } from '@nestjs/common'
import { PrismaService } from '@src/prisma.service'
import { RestaurantsController } from './restaurants.controller'
import { RestaurantsService } from './restaurants.service'

@Module({
	controllers: [RestaurantsController],
	providers: [RestaurantsService, PrismaService],
})
export class RestaurantsModule {}
