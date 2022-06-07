import { Request, Response, NextFunction } from 'express';
import { ThrowExtendedError } from '../helpers/error';

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (
        !req.session.isAuthenticated ||
        !req.session.user ||
        !req.session.userId
    )
        ThrowExtendedError('Not Authenticated', 401, undefined, '/');
    next();
}
