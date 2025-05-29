import {Router} from 'express';
import { getUsers, postUsers, putUsers } from '../controllers/users.controllers.js';

const router = Router();

router.get('/user', getUsers);
router.post('/user', postUsers);
router.put('/user/:id', putUsers);

export default router;