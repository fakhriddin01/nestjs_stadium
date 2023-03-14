export class CreateCartDto {
    user_id: number;
    user_wallet_id: number;
    st_times_id: number;
    date?: Date;
    createdAt?: Date;
    time_for_clear: string;
    status_id: number;
}
