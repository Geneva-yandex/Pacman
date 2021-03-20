import {Sequelize, SequelizeOptions} from 'sequelize-typescript';
import {Topic, Message, User, UserTheme, SiteTheme, UserTheme2} from './postgres/models';

const models = [Topic, Message, User, UserTheme, SiteTheme, UserTheme2];

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
        this.sequelize.addModels(models);

        Topic.hasMany(Message, {foreignKey: 'topic_id'});
        Message.belongsTo(Topic);

        SiteTheme.hasMany(UserTheme, {foreignKey: 'theme_id'});
        UserTheme.belongsTo(SiteTheme);

        User.hasOne(UserTheme, {foreignKey: 'owner_id'});

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
