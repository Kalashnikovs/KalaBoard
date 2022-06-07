import { matchedData, validationResult } from 'express-validator';
import { ThrowExtendedError } from '../helpers/error';
import { Request, Response, NextFunction } from 'express';

export function validationHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (errors.array()[0].location === 'params')
            ThrowExtendedError(
                'Param Validation Failed',
                422,
                errors.array({ onlyFirstError: true })
            );

        ThrowExtendedError(
            'Input Validation Failed',
            422,
            errors.array({ onlyFirstError: true })
        );
    }

    req.body = matchedData(req, { includeOptionals: false });
    next();
}
