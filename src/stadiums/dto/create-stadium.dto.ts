export class CreateStadiumDto {
    category_id: number;
    owner_id: number;
    contact_with: string;
    name: string;
    volume: string;
    address: string;
    region_id: number;
    district_id: number;
    location: string;
    build_at?: Date;
    start_time: string;
    end_time: string;
}
