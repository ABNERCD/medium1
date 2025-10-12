// En: server/src/controllers/auth.controller.ts

import { type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db';

// ADAPTACIÓN: Definir una interfaz para el usuario mejora la seguridad del tipado
interface User {
  id: number;
  nombre_completo: string;
  correo_electronico: string;
  contrasena_hash: string;
  rol_id: number;
  rol_nombre: string;
}

// ADAPTACIÓN: Validar que la clave secreta JWT exista al iniciar
if (!process.env.JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET no está definida en las variables de entorno.");
  process.exit(1);
}
const JWT_SECRET = process.env.JWT_SECRET;

// --- FUNCIÓN DE REGISTRO REFINADA ---
export const registerUser = async (req: Request, res: Response) => {
  const { nombre_completo, correo_electronico, contrasena } = req.body;

  if (!nombre_completo || !correo_electronico || !contrasena) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const userExists = await pool.query<User>(
      'SELECT * FROM usuarios WHERE correo_electronico = $1',
      [correo_electronico]
    );

    if (userExists.rows.length > 0) {
      return res.status(409).json({ message: 'El correo electrónico ya está registrado.' });
    }

    const salt = await bcrypt.genSalt(10);
    const contrasena_hash = await bcrypt.hash(contrasena, salt);

    const newUserResult = await pool.query<{ id: number }>(
      `INSERT INTO usuarios (nombre_completo, correo_electronico, contrasena_hash, rol_id) 
       VALUES ($1, $2, $3, (SELECT id FROM roles WHERE nombre = 'cliente'))
       RETURNING id`,
      [nombre_completo, correo_electronico, contrasena_hash]
    );

    const newUserId = newUserResult.rows[0].id;

    const payload = {
      userId: newUserId,
      nombre: nombre_completo,
      rol: 'cliente',
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'Usuario registrado exitosamente.',
      token,
      // ADAPTACIÓN: Devolver datos del usuario para uso inmediato en el frontend
      user: { id: newUserId, nombre: nombre_completo, email: correo_electronico, rol: 'cliente' },
    });

  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// --- FUNCIÓN DE LOGIN REFINADA ---
export const loginUser = async (req: Request, res: Response) => {
  const { correo_electronico, contrasena } = req.body;

  if (!correo_electronico || !contrasena) {
    return res.status(400).json({ message: 'El correo y la contraseña son requeridos.' });
  }

  try {
    const userResult = await pool.query<User>(
      `SELECT u.*, r.nombre as rol_nombre 
       FROM usuarios u JOIN roles r ON u.rol_id = r.id 
       WHERE u.correo_electronico = $1`,
      [correo_electronico]
    );

    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const isMatch = await bcrypt.compare(contrasena, user.contrasena_hash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const payload = {
      userId: user.id,
      nombre: user.nombre_completo,
      rol: user.rol_nombre,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login exitoso',
      token,
      // ADAPTACIÓN: Devolver datos del usuario para uso inmediato en el frontend
      user: { id: user.id, nombre: user.nombre_completo, email: user.correo_electronico, rol: user.rol_nombre },
    });

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};