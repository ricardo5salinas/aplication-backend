import {Router} from 'express';
import { getMeds, postMedss, putMeds, deleteMeds } from '../controllers/meds.controllers.js';

const router = Router();

router.get('/medication', getMeds);
router.post('/medications', postMeds);
router.put('/medication/:medication_id', putMedss);
router.delete('/medication/:medication_id', deleteMeds);

export default router;