import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AreaOfFocusModule} from './modules/area-of-focus/area-of-focus.module';
import {CharityModule} from './modules/charity/charity.module';
import {CampaignModule} from './modules/campaign/campaign.module';
import {DonationModule} from './modules/donation/donation.module';
import {EventModule} from './modules/event/event.module';
import {DonorModule} from './modules/donor/donor.module';
import {LocationModule} from './modules/location/location.module';
import {TestimonialModule} from './modules/testimonial/testimonial.module';
import {TokenModule} from './modules/token/token.module';
import {UserModule} from './modules/user/user.module';
import {AuditModule} from './modules/audit/audit.module';
import {MediaModule} from './modules/media/media.module';
import {UserCharityRoleModule} from './modules/user-charity-role/user-charity-role.module';
import {AuthModule} from "./complex-modules/auth/auth.module";
import {LoggerMiddleware} from "./common/middlewares/logger.middleware";
import {JwtModule} from "@nestjs/jwt";
import {AccessTokenGuard} from "./complex-modules/auth/guards/access-token.guard";
import {JwtStrategy} from "./complex-modules/auth/jwt.strategy";
import {ThrottlerModule} from "@nestjs/throttler";
import {APP_GUARD} from '@nestjs/core';
import {ThrottlerGuard} from '@nestjs/throttler';
import {RedisProvider} from "./shared/redis.provider";
import {EmailModule} from "./complex-modules/email/email.module";

const TypeOrmConfig = TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'ghana_charities',
    autoLoadEntities: true,
    synchronize: true, // set to false in production
    retryDelay: 1000,
    retryAttempts: 2,
    entities: [__dirname + '/../**/*.entity.js'] // or similar js glob pattern

})

const Modules = [
    AreaOfFocusModule,
    CharityModule,
    CampaignModule,
    DonationModule,
    EventModule,
    DonorModule,
    LocationModule,
    TestimonialModule,
    TokenModule,
    UserModule,
    AuditModule,
    MediaModule,
    UserCharityRoleModule
];

const ComplexModules = [AuthModule, EmailModule];

const JWT_MODULE = JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: '1h'},
})

const THROTTLE_MODULE = ThrottlerModule.forRoot({
    throttlers: [
        {
            ttl: parseInt(process.env.THROTTLE_TTL || '60', 10),
            limit: parseInt(process.env.THROTTLE_LIMIT || '10', 10),
        }
    ]
})

@Module({
    imports: [
        TypeOrmConfig,
        JWT_MODULE,
        THROTTLE_MODULE,
        ...Modules,
        ...ComplexModules
    ],
    providers: [
        JwtStrategy,
        AccessTokenGuard,
        RedisProvider,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ],
    exports: [JwtModule, AccessTokenGuard, RedisProvider],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');  // applies to all routes
    }
}
