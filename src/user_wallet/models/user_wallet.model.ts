import { Column, DataType, Table, Model, BelongsTo, HasMany, PrimaryKey, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/models/user.model";

interface UserWalletAttr {
    user_id: number;
    wallet: number;


}
@Table({tableName:"user_wallet"})
export class UserWallet extends Model<UserWallet, UserWalletAttr> {

    @Column({
        type:DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(()=>User)
    @Column({
        type:DataType.BIGINT
    })
    user_id: number;

    @Column({
        type:DataType.BIGINT
    })
    wallet: number;

    @BelongsTo(()=> User)
    user: User;
}
