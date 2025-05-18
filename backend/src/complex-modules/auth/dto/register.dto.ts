import {IsEmail, IsEnum, IsString, MinLength} from "class-validator";
import {AuthProvider} from "../../../enums/auth.enum";

export class RegisterLocalDto {
    @IsEmail()
    email!: string;

    @MinLength(6)
    password!: string;

    @IsString()
    firstName!: string;

    @IsString()
    lastName!: string;
}
export class RegisterOAuthDto {
    @IsEmail()
    email!: string;

    @IsString()
    firstName!: string;

    @IsString()
    lastName!: string;

    @IsEnum(AuthProvider)
    provider!: AuthProvider;

    @IsString()
    providerId!: string; // e.g., Google user id
}
