import { Injectable, NotImplementedException } from '@nestjs/common';
import {OAuthUserData} from "./google-auth.service";

@Injectable()
export class FacebookAuthService {
    async verifyToken(idToken: string): Promise<OAuthUserData> {
        // You would call Facebook's token inspection endpoint here
        // https://developers.facebook.com/docs/facebook-login/guides/access-tokens/#debug
        throw new NotImplementedException('Facebook login is not implemented yet.');

        // Example of what you'd eventually return:
        /*
        return {
          email: 'user@example.com',
          firstName: 'First',
          lastName: 'Last',
          providerId: 'facebook-user-id',
        };
        */
    }
}