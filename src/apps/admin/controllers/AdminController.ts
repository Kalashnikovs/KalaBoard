import { Request, Response, NextFunction } from 'express';
import { ViewManager } from '../../../core/ViewManager';
import { FlashActionAlert } from '../../shared/helpers/flash';
import { INode, NodeType, ICategory } from '../../shared/interfaces/Node';
import {
    generateSnowflake,
    isValidSnowflake,
} from '../../shared/helpers/Snowflake';
import { NodeService } from '../services/NodeService';
import { ThrowExtendedError } from '../../shared/helpers/error';

export class AdminController {
    static async getAdmin(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        ViewManager.render(res, 'admin/admin.ejs');
    }

    static async getNodes(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        ViewManager.render(res, 'admin/nodes.ejs', {
            data: await NodeService.getNodes(),
        });
    }

    static async getAddCategory(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        ViewManager.render(res, 'admin/add-category.ejs');
    }

    static async postAddCategory(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const categoryData: INode = req.body;
        categoryData.id = generateSnowflake();
        categoryData.type = NodeType.CATEGORY;
        await NodeService.addCategory(categoryData);
        res.redirect(req.originalUrl);
    }

    static async getEditCategory(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const snowflake = req.params.id;
        if (
            !isValidSnowflake(snowflake) ||
            !(await NodeService.isValidCategoryId(snowflake))
        )
            ThrowExtendedError(
                'ID must be a valid Category Snowflake ID',
                422,
                undefined,
                '/admin/nodes'
            );

        ViewManager.render(res, 'admin/edit-category.ejs', {
            input: await NodeService.getNode(snowflake),
        });
    }

    static async postEditCategory(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const data: ICategory = req.body;
        const snowflake = req.params.id;
        if (
            !isValidSnowflake(snowflake) ||
            !(await NodeService.isValidCategoryId(snowflake))
        )
            ThrowExtendedError(
                'ID must be a valid Category Snowflake ID',
                422,
                undefined,
                '/admin/nodes'
            );

        await NodeService.editCategory(snowflake, data);
        res.redirect(req.originalUrl);
    }

    static async postDeleteCategory(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const snowflake = req.params.id;
        if (
            !isValidSnowflake(snowflake) ||
            !(await NodeService.isValidCategoryId(snowflake))
        )
            ThrowExtendedError(
                'ID must be a valid Category Snowflake ID',
                422,
                undefined,
                '/admin/nodes'
            );

        await NodeService.deleteCategory(snowflake);
        res.redirect('/admin/nodes');
    }
}
