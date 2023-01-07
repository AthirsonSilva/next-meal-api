import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { PrismaService } from './prisma.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const prismaService = app.get(PrismaService)

	const config = new DocumentBuilder()
		.setTitle('Nest Meal')
		.setDescription('A simple meal reservation app')
		.setVersion('0.1')
		.setLicense('MIT', 'https://opensource.org/licenses/MIT')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document)

	await prismaService.enableShutdownHooks(app)
	await app.listen(3000)
}
bootstrap()
