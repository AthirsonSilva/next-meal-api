import { Module, forwardRef } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@src/prisma.service'
import { AuthModule } from './auth/auth.module'
import { RestaurantsController } from './restaurants.controller'
import { RestaurantsService } from './restaurants.service'

@Module({
	imports: [forwardRef(() => AuthModule)],
	exports: [RestaurantsService],
	controllers: [RestaurantsController],
	providers: [RestaurantsService, PrismaService, JwtService],
})
export class RestaurantsModule {}
