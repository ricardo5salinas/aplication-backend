import {Router} from 'express';
import { getPayments, postPayments, putPayments, deletePayments } from '../controllers/payments.controllers.js';
import { validSchemas } from '../middlewares/valid.schemas.js';
import { paymentSchema, paymentPutSchema } from '../schemas/payments.schemas.js';


const router = Router();

router.get('/payment', getPayments);
router.post('/payment', validSchemas(paymentSchema),postPayments);
router.put('/payment/:payment_id', validSchemas(paymentPutSchema),putPayments);
router.delete('/payment/:payment_id', deletePayments);

export default router;