import express from 'express';
import { PORT } from './confg.js';
import userRoutes from './routes/users.routes.js';
import medsRoutes from './routes/meds.routes.js';

const app = express();

app.use(express.json());
app.use(medsRoutes);
app.use(userRoutes);

app.listen(PORT)
console.log('Server on port', PORT);
