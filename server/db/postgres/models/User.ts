import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';

@Table({
    timestamps: false,
    paranoid: true,
    tableName: 'user'
})
class User extends Model<User> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        field: 'user_id'
    })
    userId: string;
}

export default User;
