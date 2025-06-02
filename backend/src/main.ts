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
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

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

    const buildSwaggerDir = join(__dirname, '../swagger');
    const rootSwaggerDir = join(__dirname, '../../swagger');

    const swaggerJson = JSON.stringify(document, null, 2);

// Ensure both directories exist
    [buildSwaggerDir, rootSwaggerDir].forEach(dir => {
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }
    });

// Write to both locations
    writeFileSync(join(buildSwaggerDir, 'swagger.json'), swaggerJson);
    writeFileSync(join(rootSwaggerDir, 'swagger.json'), swaggerJson);

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
