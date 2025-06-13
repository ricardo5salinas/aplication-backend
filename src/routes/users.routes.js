import {Router} from 'express';
import { getUsers, postUsers, putUsers, deleteUsers } from '../controllers/users.controllers.js';
import { validSchemas } from '../middlewares/valid.schemas.js';
import { userSchema, userPutSchema } from '../schemas/users.schemas.js';


const router = Router();

router.get('/user', getUsers);
router.post('/user', validSchemas(userSchema),postUsers);
router.put('/user/:user_id', validSchemas(userPutSchema),putUsers);
router.delete('/user/:user_id', deleteUsers);

export default router;