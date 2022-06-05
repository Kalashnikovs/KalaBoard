import { Router } from 'express';
import { KalaController } from '../controllers/KalaController';

const router = Router();

router.get('/', KalaController.getHome);

export default router;
