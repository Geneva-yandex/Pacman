import {NextFunction, Request, Response} from 'express';
import axios from 'axios';

const PRAKTIKUM_AUTH_ENDPOINT = 'https://ya-praktikum.tech/api/v2/auth/user';

async function auth(req: Request, res: Response, next: NextFunction) {
    try {
        const {data} = await getUser(req);
        res.locals.user = data;
    } catch (err) {
        res.locals.user = null;
    }

    next();
}

export async function authReq(req: Request, res: Response, next: NextFunction) {
    try {
        const {data} = await getUser(req);
        res.locals.user = data;
        next();
    } catch (err) {
        res.send(401);
    }
}

async function getUser(req: Request) {
    const authData = {
        authCookie: req.cookies.authCookie,
        uuid: req.cookies.uuid
    };

    const cookies = Object
        .entries(authData)
        .map(([key, value]) => `${key}=${value}`)
        .join(';');

    return axios.get(PRAKTIKUM_AUTH_ENDPOINT, {
        headers: {Cookie: cookies}
    });
}

export default auth;
