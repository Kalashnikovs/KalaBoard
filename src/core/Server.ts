import 'dotenv/config';
import { startup } from '../loaders/loader';
import { Logger } from './Logger';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import http from 'http';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import Router from './Router';
import { Database } from './Database';
import { StaticConfig } from '../config/StaticConfig';
import session from './Session';
import appRoot from 'app-root-path';
import { ViewManager } from './ViewManager';
import csurf from 'csurf';
import flash from 'express-flash';
import { FlashActionAlert } from '../apps/shared/helpers/flash';

export class Server {
    private app: express.Application = express();
    private _server!: http.Server;

    constructor() {
        try {
            this.initLoader();
            this.initExpress();
            this.initMiddlewares();
            //this.rateLimiter();
            this.initRouter();
            this.initErrorHandler();
            this.initDatabase();
        } catch (err) {
            Logger.error(err);
            throw new Error('Failed To Initialize Server');
        }
    }

    listen = (port: string | number, cb?: () => void): void => {
        this._server = this.app.listen(port, cb);
    };

    close = (): void => {
        if (this._server) this._server.close();
    };

    get server(): http.Server {
        return this._server;
    }

    private initLoader() {
        if (!process.env.NODE_ENV) throw new Error('BAD NODE_ENV');
        startup(process.env.NODE_ENV);
    }

    private initExpress() {
        this.app.set('views', ViewManager.get('views'));
        this.app.set('view engine', ViewManager.get('view engine'));
    }

    private initMiddlewares() {
        this.app.use(
            '/',
            express.static(appRoot.path + '/public/' + ViewManager.get('theme'))
        );
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(session());
        this.app.use(csurf());
        this.app.use(flash());

        this.app.use((req, res, next) => {
            res.locals.csrfToken = req.csrfToken();
            next();
        });
    }

    private rateLimiter() {
        this.app.use(
            rateLimit({
                windowMs: 1 * 60 * 1000,
                max: 100, // 100 requests per minute
                standardHeaders: true,
                legacyHeaders: false,
                message: 'HTTP 429 TOO MANY REQUESTS',
            })
        );
    }

    private initRouter() {
        this.app.use('/', Router.getRouter());
    }

    private initErrorHandler() {
        this.app.use(
            (err: any, req: Request, res: Response, next: NextFunction) => {
                const status = err.status || 500;
                const error = { message: err.message, errors: err.errors };

                if (this.app.get('env') === 'dev')
                    Object.assign(error, {
                        stack: err.stack,
                        debug: err,
                    });

                if (status === 422) {
                    req.flash('InputError', err.errors);
                    return res.redirect(req.originalUrl);
                }

                FlashActionAlert(req, 'error', err.message);
                return res.redirect(req.originalUrl);
            }
        );
    }

    private async initDatabase() {
        const MONGODB_URI = `mongodb+srv://${StaticConfig.get(
            'MONGODB_USER'
        )}:${StaticConfig.get('MONGODB_PASS')}@${StaticConfig.get(
            'MONGODB_HOST'
        )}/${StaticConfig.get('MONGODB_DATABASE')}`;

        Database.connectMongodb(MONGODB_URI, (err) => {
            if (err) {
                Logger.error('MONGODB:', err);
                process.exit(1);
            }
            Logger.info('Successfully connected to MongoDB');
        });
    }
}
