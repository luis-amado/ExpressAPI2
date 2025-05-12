import { Router } from 'express';
import { getUsers, postUser } from '../controllers/users.controller.js';

const router = Router();

router.get('/users', getUsers);
router.post('/users', postUser);

export default router;
