import {Request} from 'express';

function getIdParam(req: Request) {
    const id = req.params.id;
    if (/^\d+$/.test(id)) {
        return Number.parseInt(id, 10);
    }

    throw new TypeError(`Invalid ':id' param: "${id}"`);
}

export default getIdParam;
