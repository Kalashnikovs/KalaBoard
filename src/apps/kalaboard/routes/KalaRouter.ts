import express from 'express';
import KalaRoutes from './KalaRoutes';

export default class Router {
    private static router: express.Router;
    private static basePath = '';

    static getRouter(): express.Router {
        if (!Router.router) {
            Router.router = express.Router();
            Router.registerLocalRoutes();
        }
        return Router.router;
    }

    private static registerLocalRoutes(): void {
        Router.router.use(Router.basePath, KalaRoutes);
    }
}
