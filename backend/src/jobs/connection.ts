import {Queue, RedisOptions} from 'bullmq';

export const connection: RedisOptions = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    username: process.env.REDIS_USERNAME || undefined,
    password: process.env.REDIS_PASSWORD || undefined,
};

const connectionOptions = {
    connection,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000
        }
    }
}

export function createQueue(name: string) {
    return new Queue(name, connectionOptions);
}