import {Router} from 'express';
import { getDoctors, postDoctors, putDoctors, deleteDoctors } from '../controllers/doctors.controllers.js';
import { validSchemas } from '../middlewares/valid.schemas.js';
import { doctorSchema, doctorPutSchema } from '../schemas/doctors.schemas.js';


const router = Router();

router.get('/doctor', getDoctors);
router.post('/doctor', validSchemas(doctorSchema),postDoctors);
router.put('/doctor/:doctor_id', validSchemas(doctorPutSchema),putDoctors);
router.delete('/doctor/:doctor_id', deleteDoctors);

export default router;