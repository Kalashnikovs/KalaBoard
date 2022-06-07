import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { IUser } from '../../shared/interfaces/User';
import { generateSnowflake } from '../../shared/helpers/Snowflake';
import { ViewManager } from '../../../core/ViewManager';
import { FlashActionAlert } from '../../shared/helpers/flash';
import { ThrowExtendedError } from '../../shared/helpers/error';

export class AuthController {
    static async getRegister(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        ViewManager.render(res, 'auth/register.ejs');
    }

    static async postRegister(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const userdata: IUser = req.body;
        userdata.id = generateSnowflake();
        await AuthService.register(userdata);
        FlashActionAlert(req, 'success', 'Registration Successful!');
        res.redirect('/');
    }

    static async getLogin(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        ViewManager.render(res, 'auth/login.ejs');
    }

    static async postLogin(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const { email, password } = req.body;
        const user = await AuthService.login({ email, password });
        req.session.user = user;
        req.session.userId = user.id;
        req.session.isAuthenticated = true;
        req.session.save((err) => {
            if (err) ThrowExtendedError('Internal Server Error', 500, err);
        });
        FlashActionAlert(req, 'success', 'Login Successful!');
        res.redirect('/');
    }

    static async postLogout(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        req.session.destroy((err) => res.redirect('/login'));
    }
}
