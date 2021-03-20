import {Router} from 'express';
import ThemesApi from '../controllers/themesApi';

const themesRoutes = (router: Router) => {
    const themesRouter: Router = Router();

    themesRouter
        .get('/', ThemesApi.getAll)
        .get('/:id', ThemesApi.getById)
        .post('/', ThemesApi.create)
        .put('/', ThemesApi.update)
        .delete('/', ThemesApi.delete);

    router.use('/api/themes', themesRouter);
};

export default themesRoutes;
