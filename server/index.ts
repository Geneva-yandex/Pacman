import {sslServer} from './app';
import Mongo from './db/Mongo';
import Postgres from './db/Postgres';

(async () => {
    const port = process.env.PORT || 9001;

    const mongo = new Mongo(process.env.DATABASE_MONGO_URL as string);

    const postgres = new Postgres({
        host: 'postgres',
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        dialect: 'postgres'
    });

    await postgres.connect();
    await mongo.connect();

    sslServer.listen(port, () => {
        console.log(`Application is started on localhost:${port}`);
    });
})();
