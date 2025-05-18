import 'reflect-metadata';
import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from "./app.module";
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import {ThrottlerGuard} from "@nestjs/throttler";
import {ValidationPipe} from "@nestjs/common";
import {RateLimitExceptionFilter} from "./common/filters/rate-limit.filter";

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );
    const corsOrigins = process.env.CORS_ORIGINS?.split(',') || [];

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Ghana Charities API')
        .setDescription('API documentation for UK Ghana Charities Directory')
        .setVersion('1.0')
        .addBearerAuth()
        .build();


    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);


    app.enableCors({
        origin: corsOrigins,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new RateLimitExceptionFilter());

    await app.listen(3000);
}

bootstrap();
