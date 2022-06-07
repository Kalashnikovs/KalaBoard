import { Router } from 'express';
import { isAuthenticated } from '../../shared/middleware/isAuthenticated';
import { AuthController } from '../controllers/AuthController';
import { validateLogin, validateRegister } from '../validation/AuthValidator';

const router = Router();

router.get('/auth/register', AuthController.getRegister);
router.post('/auth/register', validateRegister(), AuthController.postRegister);

router.get('/auth/login', AuthController.getLogin);
router.post('/auth/login', validateLogin(), AuthController.postLogin);

router.get('/auth/logout', isAuthenticated, AuthController.postLogout);

export default router;
