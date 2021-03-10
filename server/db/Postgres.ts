import {Sequelize} from 'sequelize-typescript';
import {SequelizeOptions} from 'sequelize-typescript/dist/sequelize/sequelize/sequelize-options';

export default class Postgres {
    static __instance: Postgres;
    options: SequelizeOptions;
    sequelize: Sequelize;

    constructor(options) {
        if (Postgres.__instance) {
            return Postgres.__instance;
        }

        this.options = options;

        Postgres.__instance = this;
    }

    async connect() {
        this.sequelize = new Sequelize(this.options);

        try {
            await this.sequelize.authenticate();
            console.log('Postgres successful connection');
        } catch (err) {
            console.error('Postgres connection error:', err);
            throw err;
        }
    }
}
