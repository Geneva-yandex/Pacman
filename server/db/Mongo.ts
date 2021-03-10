import mongoose, {ConnectOptions} from 'mongoose';

export default class Mongo {
    static __instance: Mongo;
    url: string;
    options: ConnectOptions;

    constructor(url: string, options: ConnectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }) {
        if (Mongo.__instance) {
            return Mongo.__instance;
        }

        this.url = url;
        this.options = options;

        Mongo.__instance = this;
    }

    connect() {
        mongoose.connect(this.url, this.options);

        return new Promise((resolve, reject) => {
            mongoose.connection.on('error', err => {
                console.error('Mongo connection error:', err);
                reject(err);
            });

            mongoose.connection.once('open', () => {
                console.log('Mongo successful connection');
                resolve(null);
            });
        })
    }
}
