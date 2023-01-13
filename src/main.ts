import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as session from 'express-session'
import * as passport from 'passport'
import { AppModule } from './app.module'
import { jwtConstants } from './auth/constants/constants'
import { PrismaService } from './prisma.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const prismaService = app.get(PrismaService)

	// Swagger
	const config = new DocumentBuilder()
		.setTitle('Nest Meal')
		.setDescription('A simple meal reservation app')
		.setVersion('0.1')
		.setLicense('MIT', 'https://opensource.org/licenses/MIT')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document)

	// Authentication
	app.use(
		session({
			secret: jwtConstants.secret,
			resave: false,
			saveUninitialized: false,
			cookie: { maxAge: 60000 },
		}),
	)
	app.use(passport.initialize())
	app.use(passport.session())

	await prismaService.enableShutdownHooks(app)
	await app.listen(3000)
}
bootstrap()
