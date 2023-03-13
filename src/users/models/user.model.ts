import { Column, DataType, Table, Model, BelongsTo, HasMany, HasOne } from "sequelize-typescript";
import { Comment } from "src/comments/models/comment.model";
import { Stadium } from "src/stadiums/models/stadium.model";
import { UserCard } from "src/user_cards/models/user_card.model";
import { UserWallet } from "src/user_wallet/models/user_wallet.model";

interface UserAttr {
    first_name: string;
    last_name: string;
    username: string;
    hashed_password: string;
    telegram_link?: string;
    email: string;
    phone: string;
    birthday: Date;
    user_photo: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserAttr>{

    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type:DataType.STRING,
        allowNull: false,
    })
    first_name: string;

    @Column({
        type:DataType.STRING,
    })
    last_name: string;

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    username: string;

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    hashed_password: string;

    @Column({
        type:DataType.STRING,
    })
    telegram_link: string;

    @Column({
        type:DataType.STRING,
        allowNull: false,
        unique: true
    })
    email: string;

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    phone: string;

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    user_photo: string;

    @Column({
        type:DataType.DATE,
    })
    birthday: Date;

    @Column({
        type:DataType.BOOLEAN,
        defaultValue: false
    })
    is_owner: boolean;

    @Column({
        type:DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean;

    @HasMany(()=>UserCard)
    cards: UserCard;

    
    @HasOne(()=>UserWallet)
    wallet: UserWallet
    
    @HasMany(()=>Stadium)
    stadiums: Stadium[];

    @HasMany(()=>Comment)
    comments: Stadium[];

}
