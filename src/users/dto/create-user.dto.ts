import { IsNotEmpty, IsString, IsDate, IsEmail, IsStrongPassword , isPhoneNumber, IsDateString} from "class-validator";


export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    hashed_password: string;

    // @IsString()
    // telegram_link: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsDateString()
    birthday: Date;
}
