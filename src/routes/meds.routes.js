import {Router} from 'express';
import { getMeds, postMeds, putMeds, deleteMeds } from '../controllers/meds.controllers.js';

const router = Router();

router.get('/medication', getMeds);
router.post('/medication', postMeds);
router.put('/medication/:medication_id', putMeds);
router.delete('/medication/:medication_id', deleteMeds);

export default router;