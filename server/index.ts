import {sslServer} from './app';
import Mongo from './db/Mongo';
import Postgres from './db/Postgres';

const port = process.env.PORT || 9001;

const mongo = new Mongo(process.env.DATABASE_MONGO_URL as string);
const postgres = new Postgres({
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'newPassword',
    database: 'packman',
    dialect: 'postgres'
})

postgres
    .connect()
    .then(() => {
        return mongo.connect();
    })
    .then(() => {
        sslServer.listen(port, () => {
            console.log(`Application is started on localhost:${port}`);
        });
    });
