import express from 'express';
import { PORT } from './confg.js';
import userRoutes from './routes/users.routes.js';

const app = express();

app.use(userRoutes)

app.listen(PORT)
console.log('Server on port', PORT);
