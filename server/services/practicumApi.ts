const fetch = require('node-fetch');

class PraktikumApi {
    public static getUsers = async (userIds: number[]) => {
        let promises: Promise<unknown>[] = [];

        userIds.forEach(id => {
            let promise = new Promise((resolve, reject) => {
                fetch(`https://ya-praktikum.tech/api/v2/user/${id}`, {
                    headers: {
                        accept: 'application/json',
                        cookie: ''
                    },
                    method: 'GET'
                })
                    .then((res: any) => res.json())
                    .then((user: unknown) => {
                        resolve(user);
                    })
                    .catch((err: unknown) => {
                        reject(err);
                    });
            });
            promises.push(promise);
        });

        let users = await Promise.all(promises);
        return users;
    };
}

export default PraktikumApi;
