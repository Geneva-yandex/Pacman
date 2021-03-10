import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import Topic from "./Topic";

@Table({
    tableName: 'messages'
})
class Message extends Model<Message> {
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
    @Column(DataType.INTEGER)
    message_id: number;

    @ForeignKey(() => Topic)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    topic_id: number;

    @BelongsTo(() => Topic)
    topic: Topic
}


export default Message
