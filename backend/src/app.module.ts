import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserModule} from "./modules/user/user.module";

const TypeOrmConfig = TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'ghana_charities',
    autoLoadEntities: true,
    synchronize: true, // set to false in production
})

const Modules = [
    UserModule
];
@Module({
    imports: [
        TypeOrmConfig,
        ...Modules
    ],
})
export class AppModule {}
