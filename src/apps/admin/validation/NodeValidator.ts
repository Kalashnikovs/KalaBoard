import { body } from 'express-validator';
import { RequestHandler } from 'express';
import { validationHandler } from '../../shared/validation/handler';

export function validateNode(): RequestHandler[] {
    return [
        body(
            'title',
            'title must be between 2-32 Characters, and can only contain Letters, and Numbers'
        )
            .exists()
            .trim()
            .isAlphanumeric()
            .isLength({ min: 2, max: 32 }),
        body('description', 'description must be between 2-50 Characters')
            .exists()
            .trim()
            .isLength({ min: 2, max: 50 }),
        body('parentId', 'ParentID must be a valid Node Snowflake ID')
            .exists()
            .isString()
            .matches(/^[0-9]+$/),
        body('displayOrder', 'Display Order must be a Number')
            .exists()
            .isNumeric(),
        validationHandler,
    ];
}
