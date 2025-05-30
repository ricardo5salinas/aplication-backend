import {Router} from 'express';
import { getUsers, postUsers, putUsers, deleteUsers } from '../controllers/users.controllers.js';

const router = Router();

router.get('/user', getUsers);
router.post('/user', postUsers);
router.put('/user/:user_id', putUsers);
router.delete('/user/:user_id', deleteUsers);

export default router;