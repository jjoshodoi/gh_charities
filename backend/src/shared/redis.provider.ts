import { Provider } from '@nestjs/common';
import { Redis } from 'ioredis';

export const RedisProvider: Provider = {
    provide: 'REDIS',
    useFactory: () => {
        return new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASSWORD || undefined,
        });
    },
};
