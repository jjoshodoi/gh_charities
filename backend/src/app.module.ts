import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaOfFocusModule } from './modules/area-of-focus/area-of-focus.module';
import { CharityModule } from './modules/charity/charity.module';
import { CampaignModule } from './modules/campaign/campaign.module';
import { DonationModule } from './modules/donation/donation.module';
import { EventModule } from './modules/event/event.module';
import { DonorModule } from './modules/donor/donor.module';
import { LocationModule } from './modules/location/location.module';
import { FeatureModule } from './modules/feature/feature.module';
import { TestimonialModule } from './modules/testimonial/testimonial.module';
import { TokenModule } from './modules/token/token.module';
import { UserModule } from './modules/user/user.module';
import { AuditModule } from './modules/audit/audit.module';
import { MediaModule } from './modules/media/media.module';
import { UserCharityRoleModule } from './modules/user-charity-role/user-charity-role.module';

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
    AreaOfFocusModule,
    CharityModule,
    CampaignModule,
    DonationModule,
    EventModule,
    DonorModule,
    LocationModule,
    FeatureModule,
    TestimonialModule,
    TokenModule,
    UserModule,
    AuditModule,
    MediaModule,
    UserCharityRoleModule,
    UserCharity-RoleModule
];
@Module({
    imports: [
        TypeOrmConfig,
        ...Modules
    ],
})
export class AppModule {}
