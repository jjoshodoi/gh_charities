import {JwtStrategy} from './jwt.strategy';
import {JwtModule} from '@nestjs/jwt';
import {Module} from '@nestjs/common';
import {UserModule} from "../../modules/user/user.module";
import {GoogleAuthService} from "./google-auth.service";
import {FacebookAuthService} from "./facebook-auth.service";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";


@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'your_jwt_secret',
            signOptions: { expiresIn: '1h' },
        }),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, GoogleAuthService, FacebookAuthService],
    exports: [JwtModule, AuthService],
})
export class AuthModule {}
