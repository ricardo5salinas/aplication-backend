import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { registerSchema, loginSchema } from '../schemas/auth.schemas.js';
import {
  createUser,
  findUserByEmail,
  findUserByIdentityCard
} from '../models/users.model.js';

dotenv.config();

export const register = async (req, res) => {
  try {
    const userData = registerSchema.parse(req.body);

    const existingUser = await findUserByEmail(userData.email);
    if (existingUser) return res.status(400).json({ message: 'El correo ya está registrado.' });

    const existingCard = await findUserByIdentityCard(userData.identity_card);
    if (existingCard) return res.status(400).json({ message: 'La cédula ya está registrada.' });

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await createUser({ ...userData, password: hashedPassword });
    
    delete newUser.password;
res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ message: 'Datos inválidos', errors: err.errors });
    }
    res.status(500).json({ message: 'Error al registrar', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password); // 
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.user_id, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    delete user.password; //ocultar contraseña

    res.json({ token, user });

  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ message: 'Datos inválidos', errors: err.errors });
    }
    res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
  }
};

