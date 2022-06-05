import express from 'express';
import AuthRoutes from '../apps/auth/routes/AuthRouter';

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
		Router.router.use(AuthRoutes.getRouter());
	}
}
