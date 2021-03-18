import {Sequelize, SequelizeOptions} from 'sequelize-typescript';
// Import productFactory from "./product";
import Message from '../tables/Message';
import Topic from '../tables/Topic';

const sequelizeOptions: SequelizeOptions = {
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'newPassword',
    database: 'packman',
    dialect: 'postgres'
};

const sequelize = new Sequelize(sequelizeOptions);

sequelize.addModels([Topic, Message]);

Topic.hasMany(Message, {
    foreignKey: 'topic_id'
});
Message.belongsTo(Topic);

/*const db = {
    sequelize,
    Sequelize
    // Product: productFactory(sequelize),
};

Object.values(db).forEach((model: any) => {
    if (model.associate) {
        model.associate(db);
    }
});*/

export default sequelize;
