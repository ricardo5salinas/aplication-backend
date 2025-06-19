import { Router } from 'express';
import { register, login } from '../controllers/auth.controllers.js';
import { registerSchema, loginSchema } from '../schemas/auth.schemas.js';
import { validSchemas } from '../middlewares/valid.schemas.js';

const router = Router();

router.post('/register',validSchemas(registerSchema), register);
router.post('/login', validSchemas(loginSchema), login);

export default router;
