import {AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
import User from './User';
import SiteTheme from './SiteTheme';

@Table({
    timestamps: false,
    paranoid: true,
    tableName: 'user_theme'
})
class UserTheme extends Model<UserTheme> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => SiteTheme)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        field: 'theme_id'
    })
    themeId: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        field: 'owner_id'
    })
    ownerId: string;
}

export default UserTheme;
