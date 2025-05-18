import {ConflictException, Injectable, UnauthorizedException} from "@nestjs/common";
import {UserService} from "../../modules/user/user.module";
import {JwtService} from "@nestjs/jwt";
import {User} from "../../modules/user/user";
import * as bcrypt from "bcrypt";
import {RegisterLocalDto, RegisterOAuthDto} from "./dto/register.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<User | null> {
        const [user] = await this.userService.findByQuery({ where: { email } });

        if (!user) {
            return null;  // Silent fail if user doesn't exist
        }

        if (!user.password) {
            throw new UnauthorizedException('This account was registered using OAuth. Please log in with your provider.');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid email or password.');
        }

        return user;
    }

    async login(user: User) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async registerLocal(dto: RegisterLocalDto) {
        const [existing] = await this.userService.findByQuery({ where: { email: dto.email } });
        if (existing) throw new ConflictException('Email already registered');

        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.userService.create({ ...dto, password: hashedPassword } as User);
        if (!user) {
            throw new Error('User creation failed.');
        }
        return this.login(user);
    }

    async registerOAuth(dto: RegisterOAuthDto) {
        const [existing] = await this.userService.findByQuery({ where: { email: dto.email } });
        if (existing) return this.login(existing);

        const user = await this.userService.create({ ...dto } as User);

        if (!user) {
            throw new Error('User creation failed.');
        }

        return this.login(user);
    }
}