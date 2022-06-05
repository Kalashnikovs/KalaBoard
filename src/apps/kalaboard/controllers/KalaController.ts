import { Request, Response, NextFunction } from 'express';
import { ViewManager } from '../../../core/ViewManager';
import { FlashActionAlert } from '../../shared/helpers/flash';

export class KalaController {
    static async getHome(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        ViewManager.render(res, 'kalaboard/home.ejs');
    }
}
