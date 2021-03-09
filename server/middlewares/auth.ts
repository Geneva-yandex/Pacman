import {NextFunction, Request, Response} from 'express';
import axios from 'axios';

const PRAKTIKUM_AUTH_ENDPOINT = 'https://ya-praktikum.tech/api/v2/auth/user';

async function auth(req: Request, res: Response, next: NextFunction) {
    const authData = {
        authCookie: req.cookies.authCookie,
        uuid: req.cookies.uuid
    };

    const cookies = Object
        .entries(authData)
        .map(([key, value]) => `${key}=${value}`)
        .join(';');

    try {
        const {data} = await axios.get(PRAKTIKUM_AUTH_ENDPOINT, {
            headers: {Cookie: cookies}
        });

        res.locals.user = data;
    } catch (err) {
        res.locals.user = null;
    }

    next();
}

export default auth;
