import {Router} from 'express';
import { getAppointments, postAppointments, putAppointments, deleteAppointments } from '../controllers/appointments.controllers.js';
import { validSchemas } from '../middlewares/valid.schemas.js';
import { appointmentSchema, appointmentPutSchema } from '../schemas/appointments.schemas.js';


const router = Router();

router.get('/appointment', getAppointments);
router.post('/appointment', validSchemas(appointmentSchema), postAppointments);
router.put('/appointment/:appointment_id', validSchemas(appointmentPutSchema), putAppointments);
router.delete('/appointment/:appointment_id', deleteAppointments);

export default router;