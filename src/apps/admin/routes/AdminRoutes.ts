import { Router } from 'express';
import { AdminController } from '../controllers/AdminController';
import { isAuthenticated } from '../../shared/middleware/isAuthenticated';
import { isAdmin } from '../../shared/middleware/isAdmin';
import { validateNode } from '../validation/NodeValidator';
import { validateSnowflakeParam } from '../../shared/validation/param';

const router = Router();

router.get('/admin', isAuthenticated, isAdmin, AdminController.getAdmin);

router.get('/admin/nodes', isAuthenticated, isAdmin, AdminController.getNodes);

router.get(
    '/admin/category/add',
    isAuthenticated,
    isAdmin,
    AdminController.getAddCategory
);
router.post(
    '/admin/category/add',
    isAuthenticated,
    isAdmin,
    validateNode(),
    AdminController.postAddCategory
);

router.get(
    '/admin/category/:id/edit',
    isAuthenticated,
    isAdmin,
    AdminController.getEditCategory
);
router.post(
    '/admin/category/:id/edit',
    isAuthenticated,
    isAdmin,
    validateNode(),
    AdminController.postEditCategory
);
router.post(
    '/admin/category/:id/delete',
    isAuthenticated,
    isAdmin,
    AdminController.postDeleteCategory
);

export default router;
