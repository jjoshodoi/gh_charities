import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import {AuthProvider} from "../../../enums/auth.enum";

export class OAuthLoginDto {
    @IsEnum(AuthProvider)
    provider!: AuthProvider;

    @IsString()
    @IsNotEmpty()
    idToken!: string;
}
