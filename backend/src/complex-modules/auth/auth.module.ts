import { JwtStrategy } from './jwt.strategy';
import { JwtModule, JwtService  } from '@nestjs/jwt';
import {Controller, Post, Body, UnauthorizedException, Module, Injectable, ConflictException} from '@nestjs/common';
import {UserService} from "../../modules/user/user.module";
import {User} from "../../modules/user/user";
import * as bcrypt from 'bcrypt';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() body: { email: string; password: string; firstName: string; lastName: string }) {
        return this.authService.register(body);
    }
}


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<User | null> {
        const [user] = await this.userService.findByQuery({where: {email}})
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(user: User) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(data: Partial<User>) {
        const [existing] = await this.userService.findByQuery({where: {email: data.email}})
        if (existing) {
            throw new ConflictException('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.userService.create({
            ...data,
            password: hashedPassword,
        } as User);

        return this.login(user!);
    }
}

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'your_jwt_secret',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [JwtStrategy],
    exports: [JwtModule],
})
export class AuthModule {}
