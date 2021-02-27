const {Sequelize} = require('sequelize-typescript');

class Postgres {
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

module.exports = Postgres;
