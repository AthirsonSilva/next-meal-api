import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	exports: [UsersService],
	controllers: [UsersController],
	providers: [UsersService, PrismaService],
})
export class UsersModule {}
