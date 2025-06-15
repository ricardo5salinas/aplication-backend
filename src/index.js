import express from 'express';
import { PORT } from './confg.js';
import userRoutes from './routes/users.routes.js';
import medsRoutes from './routes/meds.routes.js';
import patientRoutes from './routes/patients.routes.js';
import appointmentsRoutes from './routes/appointments.routes.js';
import { HandleError } from './middlewares/handle.error.js';

const app = express();

app.use(express.json());
app.use(medsRoutes);
app.use(userRoutes);
app.use(patientRoutes);
app.use(appointmentsRoutes);
app.use(HandleError);

app.listen(PORT)
console.log('Server on port', PORT);

// Meds = Medicine