import express from 'express';
import KalaRouter from '../apps/kalaboard/routes/KalaRouter';
import AuthRouter from '../apps/auth/routes/AuthRouter';
import AdminRouter from '../apps/admin/routes/AdminRouter';

export default class Router {
    private static router: express.Router;

    static getRouter(): express.Router {
        if (!Router.router) {
            Router.router = express.Router();
            Router.registerLocalRoutes();
        }
        return Router.router;
    }

    private static registerLocalRoutes(): void {
        Router.router.use(KalaRouter.getRouter());
        Router.router.use(AuthRouter.getRouter());
        Router.router.use(AdminRouter.getRouter());
    }
}
