import { IsNotEmpty, IsNumberString, IsPhoneNumber, IsString } from "class-validator";


export class VeriyOtpDto{

    @IsNotEmpty()
    @IsPhoneNumber()
    check: string;
    
    @IsString()
    @IsNotEmpty()
    verification_key: string;

    @IsNumberString()
    otp: string;
}