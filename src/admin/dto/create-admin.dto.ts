export class CreateAdminDto {
    username: string;
    email: string;
    telegram_link?: string;
    admin_photo: string;
    hashed_password: string;
    phone: string;
    birthday: Date;
}
