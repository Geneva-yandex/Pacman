import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';

@Table({
    timestamps: true, // don't add 'created_at', 'updated_at'
    paranoid: true, // add 'deleted_at'
    tableName: 'topics'
})
class Topic extends Model<Topic> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    title: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    description: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    user_id: number;

    @AllowNull(true)
    @Column(DataType.TEXT)
    last_message_txt: string;
}

export default Topic;
