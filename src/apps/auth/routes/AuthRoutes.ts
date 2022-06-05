import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validateLogin, validateRegister } from '../validation/AuthValidator';

const router = Router();

router.get('/auth/register', AuthController.getRegister);
router.post('/auth/register', validateRegister(), AuthController.postRegister);

router.get('/auth/login', AuthController.getLogin);
router.post('/auth/login', validateLogin(), AuthController.postLogin);

export default router;
