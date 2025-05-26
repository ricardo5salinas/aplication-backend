import express from 'express';
import { PORT } from './confg.js';

const app = express();

app.listen(PORT)
console.log('Server on port', PORT);
