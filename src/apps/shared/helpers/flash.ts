import { Request } from 'express';

export function FlashActionAlert(req: Request, type: string, msg: string) {
    const error: any = { type, msg };
    req.flash('ActionAlert', error);
}
