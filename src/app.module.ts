import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma.service'
import { ReservationsModule } from './reservations/reservations.module'
import { RestaurantsModule } from './restaurants/restaurants.module'
import { UsersModule } from './users/users.module'
import { MealsModule } from './meals/meals.module';
import { AddressesModule } from './addresses/addresses.module';
import { DesksModule } from './desks/desks.module';
import { KitchensModule } from './kitchens/kitchens.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
	imports: [
		UsersModule,
		ReservationsModule,
		RestaurantsModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		AuthModule,
		MealsModule,
		AddressesModule,
		DesksModule,
		KitchensModule,
		RatingsModule,
	],
	providers: [PrismaService],
})
export class AppModule {}
