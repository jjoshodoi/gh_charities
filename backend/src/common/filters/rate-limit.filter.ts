import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { FastifyReply } from 'fastify';

@Catch(ThrottlerException)
export class RateLimitExceptionFilter implements ExceptionFilter {
    catch(exception: ThrottlerException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();

        response.status(429).send({
            statusCode: 429,
            error: 'Too Many Requests',
            message: 'You have exceeded the rate limit.',
        });
    }
}
