import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Index,
    Model,
    PrimaryKey,
    Table,
    Unique
} from 'sequelize-typescript';

@Table({
    timestamps: false,
    paranoid: true,
    tableName: 'site_theme'
})
class SiteTheme extends Model<SiteTheme> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @Index
    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    theme: string;
}

export default SiteTheme;
