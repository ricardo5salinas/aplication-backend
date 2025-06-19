import express from 'express';
import dotenv from 'dotenv';
import { PORT } from './confg.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import medsRoutes from './routes/meds.routes.js';
import patientRoutes from './routes/patients.routes.js';
import appointmentsRoutes from './routes/appointments.routes.js';
import doctorRoutes from './routes/doctors.routes.js';
import paymentRoutes from './routes/payments.routes.js';
import { verifyToken } from './middlewares/auth.js';
import { HandleError } from './middlewares/handle.error.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.get('/api/protected', verifyToken, (req, res) => {
res.json({ message: 'Ruta protegida accedida correctamente', userId: req.userId });
});
app.use(userRoutes);
app.use(medsRoutes);
app.use(patientRoutes);
app.use(appointmentsRoutes);
app.use(doctorRoutes);
app.use(paymentRoutes);
app.use(HandleError);

app.listen(PORT)
console.log('Server on port', PORT);

// Meds = Medicine