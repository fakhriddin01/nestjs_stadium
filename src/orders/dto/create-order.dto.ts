export class CreateOrderDto {
    user_id: number;
    user_wallet_id: number;
    st_time_id: number;
    date: Date;
    createdAt?: Date;
    status_id: number;
}
