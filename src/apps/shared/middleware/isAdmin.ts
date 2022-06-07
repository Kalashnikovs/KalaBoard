import { Request, Response, NextFunction } from 'express';
import { ThrowExtendedError } from '../helpers/error';
import { AdminService } from '../../admin/services/AdminService';

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
    if (
        !req.session.isAuthenticated ||
        !req.session.user ||
        !req.session.userId
    )
        ThrowExtendedError('Not Authenticated', 401, undefined, '/');

    if (!(await AdminService.isAdmin(req.session.userId)))
        return res.redirect('/');

    next();
}
