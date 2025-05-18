import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterLocalDto, RegisterOAuthDto } from './dto/register.dto';
import { OAuthLoginDto } from './dto/login.dto';
import { AuthProvider } from '../../enums/auth.enum';
import { GoogleAuthService, OAuthUserData } from './google-auth.service';
import { FacebookAuthService } from './facebook-auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleAuthService: GoogleAuthService,
    private readonly facebookAuthService: FacebookAuthService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user);
  }

  @Post('register-local')
  async registerLocal(@Body() body: RegisterLocalDto) {
    return this.authService.registerLocal(body);
  }

  @Post('oauth-login')
  async oauthLogin(@Body() body: OAuthLoginDto) {
    let userData: OAuthUserData;
    switch (body.provider) {
      case AuthProvider.GOOGLE:
        userData = await this.googleAuthService.verifyToken(body.idToken);
        break;
      case AuthProvider.FACEBOOK:
        userData = await this.facebookAuthService.verifyToken(body.idToken);
        break;
      default:
        throw new BadRequestException(`Unsupported provider: ${body.provider}`);
    }

    return this.authService.registerOAuth({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      provider: body.provider,
      providerId: userData.providerId,
    });
  }

  @Post('register-oauth')
  async registerOAuth(@Body() body: RegisterOAuthDto) {
    return this.authService.registerOAuth(body);
  }
}
