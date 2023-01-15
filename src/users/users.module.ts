import { Module, forwardRef } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { AuthModule } from './auth/auth.module'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	imports: [forwardRef(() => AuthModule)],
	exports: [UsersService],
	controllers: [UsersController],
	providers: [UsersService, PrismaService],
})
export class UsersModule {}
