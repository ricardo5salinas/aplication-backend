import { Router } from 'express';
import {
  getAppointments,
  getAppointmentById,
  getAppointmentByDate,
  getAppointmentByPayment,
  postAppointment,
  putAppointment,
  deleteAppointmentCtrl,
} from '../controllers/appointments.controllers.js';

import { validSchemas } from '../middlewares/valid.schemas.js';
import { appointmentSchema, appointmentPutSchema } from '../schemas/appointments.schemas.js';
import { verifyToken } from '../middlewares/auth.js';
import { IsAdmin } from '../middlewares/role.aut.js';

const router = Router();

router.use(verifyToken, IsAdmin);

router.get('/appointments', getAppointments);
router.get('/appointments/:id', getAppointmentById);
router.get('/appointments/date/:date', getAppointmentByDate);
router.get('/appointments/payment/:payment_id', getAppointmentByPayment);
router.post('/appointments', validSchemas(appointmentSchema), postAppointment);
router.put('/appointments/:id', validSchemas(appointmentPutSchema), putAppointment);
router.delete('/appointments/:id', deleteAppointmentCtrl);

export default router;
