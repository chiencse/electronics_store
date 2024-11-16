import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            disableErrorMessages: false,
            whitelist: true,
            transform: true,
        }),
    );
    app.enableCors({
        allowedHeaders: '*',
        origin: '*',
        credentials: true,
    });
    const config = new DocumentBuilder()
        .setTitle('NestJS API')
        .setDescription('The NestJS API description')
        .setVersion('2.0')
        .addTag('api')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT-auth',
                in: 'header',
            },
            'JWT-auth',
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT || 3001);
}
bootstrap();
