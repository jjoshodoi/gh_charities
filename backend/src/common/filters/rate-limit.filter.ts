import { Catch, ExceptionFilter, HttpException, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class RateLimitExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        if (status === 429) {  // Too Many Requests
            return response.status(429).json({
                statusCode: 429,
                message: 'Too many requests, please try again later.',
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }

        response.status(status).json(exception.getResponse());
    }
}
