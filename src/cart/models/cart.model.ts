import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { StadiumTime } from "src/stadium_times/models/stadium_time.model";
import { UserWallet } from "src/user_wallet/models/user_wallet.model";
import { User } from "src/users/models/user.model";

interface CartAttr {
    user_id: number;
    user_wallet_id: number;
    st_times_id: number;
    date?: Date;
    createdAt?: Date;
    time_for_clear: string;
    status_id: number;
    
}

@Table({tableName: 'cart', createdAt: false, updatedAt:false})
export class Cart extends Model<Cart, CartAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(()=> User)
    @Column({
        type: DataType.INTEGER
    })
    user_id: number;

    @ForeignKey(()=> UserWallet)
    @Column({
        type: DataType.INTEGER
    })
    user_wallet_id: number;

    @ForeignKey(()=> StadiumTime)
    @Column({
        type: DataType.INTEGER
    })
    st_time_id: number;

    @Column({
        type:DataType.DATE,
        defaultValue: Date.now(),
    })
    date: Date;

    @Column({
        type:DataType.DATE,
        defaultValue: Date.now(),
    })
    createdAt: Date;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    time_for_clear: string;

    // STATUS_ID ??????????????????????????????
    // @ForeignKey(()=> )
    // @Column({
    //     type: DataType.INTEGER
    // })
    // status_id: number;

}
