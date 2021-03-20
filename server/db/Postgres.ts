import {Sequelize} from 'sequelize-typescript';
import {SequelizeOptions} from 'sequelize-typescript/dist/sequelize/sequelize/sequelize-options';
import Topic from './tables/Topic';
import Message from './tables/Message';

export default class Postgres {
    static __instance: Postgres;
    options: SequelizeOptions;
    sequelize: Sequelize;

    constructor(options: SequelizeOptions) {
        if (Postgres.__instance) {
            return Postgres.__instance;
        }

        this.options = options;

        Postgres.__instance = this;
    }

    async connect() {
        this.sequelize = new Sequelize(this.options);
        this.sequelize.addModels([Topic, Message]);

        Topic.hasMany(Message, {
            foreignKey: 'topic_id'
        });
        Message.belongsTo(Topic);
        try {
            await this.sequelize.authenticate();
            await this.sequelize.sync({force: true});
            console.log('Postgres successful connection');
        } catch (err) {
            console.error('Postgres connection error:', err);
            throw err;
        }
    }
}
