import {Sequelize, SequelizeOptions} from 'sequelize-typescript';
import {Topic, Message} from './postgres/models';

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

        Topic.hasMany(Message, {foreignKey: 'topic_id'});
        Message.belongsTo(Topic);

        try {
            await this.sequelize.authenticate();
            await this.sequelize.sync();

            console.log('Postgres successful connection');
        } catch (err) {
            console.error('Postgres connection error:', err);
            throw err;
        }
    }
}
