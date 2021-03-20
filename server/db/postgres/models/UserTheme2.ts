import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';

@Table({
    timestamps: false,
    paranoid: true,
    tableName: 'user_theme2'
})
class UserTheme2 extends Model<UserTheme2> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    theme: string;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        field: 'owner_id'
    })
    ownerId: string;
}

export default UserTheme2;
