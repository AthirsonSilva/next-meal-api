import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ReservationsModule } from './reservations/reservations.module'
import { RestaurantsModule } from './restaurants/restaurants.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [UsersModule, ReservationsModule, RestaurantsModule],
	controllers: [],
	providers: [PrismaService],
})
export class AppModule {}
