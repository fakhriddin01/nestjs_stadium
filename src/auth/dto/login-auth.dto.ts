import { IsEmail, IsStrongPassword, MinLength } from "class-validator";


export class LoginDto {
    @IsEmail()
    readonly email: string;
    @IsStrongPassword()
    @MinLength(10,{})
    readonly password: string;
}