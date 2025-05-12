import { Router } from 'express';
import { getIndex, getPing } from '../controllers/index.controller.js';

const router = Router();

router.get('/', getIndex);
router.get('/ping', getPing);

export default router;
