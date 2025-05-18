import {BadRequestException, Injectable} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

export interface OAuthUserData {
    email: string;
    firstName: string;
    lastName: string;
    providerId: string;
}

@Injectable()
export class GoogleAuthService {
    private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    async verifyToken(idToken: string): Promise<OAuthUserData> {
        const ticket = await this.client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        if (!payload?.email || !payload?.sub || !payload?.given_name || !payload?.family_name) {
            throw new BadRequestException('Invalid Google account data');
        }

        return {
            email: payload.email,
            firstName: payload.given_name,
            lastName: payload.family_name,
            providerId: payload.sub,
        };
    }
}
