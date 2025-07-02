// src/models/prismaClient.js
import { PrismaClient } from '../generated/prisma/index.js'; // ajusta la ruta si tu output está en otro lugar

export const prisma = new PrismaClient();


export default prisma

