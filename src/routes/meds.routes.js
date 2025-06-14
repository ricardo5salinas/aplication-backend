import {Router} from 'express';
import { getMeds, postMeds, putMeds, deleteMeds } from '../controllers/meds.controllers.js';
import { validSchemas } from '../middlewares/valid.schemas.js';
import { medSchema, medPutSchema } from '../schemas/meds.schemas.js';

const router = Router();

router.get('/medication', getMeds);
router.post('/medication', validSchemas(medSchema), postMeds);
router.put('/medication/:medication_id', validSchemas(medPutSchema), putMeds);
router.delete('/medication/:medication_id', deleteMeds);

export default router;