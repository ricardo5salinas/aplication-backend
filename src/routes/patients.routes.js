import {Router} from 'express';
import { getPatients, postPatients, putPatients, deletePatients } from '../controllers/patients.controllers.js';
import { validSchemas } from '../middlewares/valid.schemas.js';
import { patientSchema, patientPutSchema } from '../schemas/patients.schemas.js';


const router = Router();

router.get('/patient', getPatients);
router.post('/patient', validSchemas(patientSchema), postPatients);
router.put('/patient/:patient_id', validSchemas(patientPutSchema), putPatients);
router.delete('/patient/:patient_id', deletePatients);

export default router;