import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma.service'
import { ReservationsModule } from './reservations/reservations.module'
import { RestaurantsModule } from './restaurants/restaurants.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		UsersModule,
		ReservationsModule,
		RestaurantsModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		AuthModule,
	],
	providers: [PrismaService],
})
export class AppModule {}
