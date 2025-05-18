import 'reflect-metadata';
import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import {ValidationPipe} from '@nestjs/common';
import {RateLimitExceptionFilter} from './common/filters/rate-limit.filter';
import fastify from 'fastify';
import {createBullBoard} from '@bull-board/api';
import {FastifyAdapter as BullBoardFastifyAdapter} from '@bull-board/fastify';
import {BullMQAdapter} from '@bull-board/api/bullMQAdapter';
import {emailQueue} from './jobs/email/email.queue';

async function runBullBoard() {
    const serverAdapter = new BullBoardFastifyAdapter();
    serverAdapter.setBasePath('/admin/queues');

    createBullBoard({
        queues: [new BullMQAdapter(emailQueue)],
        serverAdapter,
    });

    const bullApp = fastify();
    await bullApp.register(serverAdapter.registerPlugin(), {
        basePath: '/admin/queues',
        prefix: '/admin/queues'
    });


    await bullApp.listen({ port: 3001 });
    console.log('✅ Bull Board running on http://localhost:3001/admin/queues');
}

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

    // Start BullMQ Admin Panel on a separate port
    await runBullBoard();

    // Start your NestJS app on port 3000
    await app.listen(3000);
}

bootstrap();
