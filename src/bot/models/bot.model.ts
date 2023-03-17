import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, BelongsTo, HasMany, HasOne } from "sequelize-typescript";

interface BotAttr {
    user_id: number;
    username: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    status: boolean;
}

@Table({tableName: 'bot'})
export class Bot extends Model<Bot, BotAttr>{

    @ApiProperty({
        example: 1234,
        description: 'user telegram id'
    })
    @Column({
        type:DataType.BIGINT,
        allowNull: false,
        primaryKey: true,
    })
    user_id: number;

    @ApiProperty({
        example: 'John',
        description: 'username'
    })
    @Column({
        type:DataType.STRING,
    })
    username: string;

    @ApiProperty({
        example: 'John',
        description: 'username'
    })
    @Column({
        type:DataType.STRING,
    })
    first_name: string;

    @ApiProperty({
        example: 'Doe',
        description: 'user last name'
    })
    @Column({
        type:DataType.STRING,
    })
    last_name: string;

    @ApiProperty({
        example: '+998990001122',
        description: 'user phone number'
    })
    @Column({
        type:DataType.STRING,
    })
    phone_number: string;

    @ApiProperty({
        example: 'false',
        description: 'user status'
    })
    @Column({
        type:DataType.BOOLEAN,
    })
    status: boolean;



}
