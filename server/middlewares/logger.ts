import {NextFunction, Request, Response} from 'express';

export default function () {
    return (req: Request, _res: Response, next: NextFunction) => {
        req.logger = () => {
            console.log(req);
        };

        next();
    };
}
