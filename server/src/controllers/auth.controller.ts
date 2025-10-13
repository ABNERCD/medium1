// En: server/src/controllers/auth.controller.ts

import { type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db';

// --- FUNCIÓN DE REGISTRO MEJORADA ---
export const registerUser = async (req: Request, res: Response) => {
    const { nombre_completo, correo_electronico, contrasena  } = req.body;

    if (!nombre_completo || !correo_electronico || !contrasena ) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    try {
        const [existingUser]: any = await pool.query(
            'SELECT id FROM usuarios WHERE correo_electronico = ?',
            [correo_electronico]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'El correo electrónico ya está registrado.' });
        }

        const salt = await bcrypt.genSalt(10);
        const contrasena_hash = await bcrypt.hash(contrasena , salt);

        const [result]: any = await pool.query(
            'INSERT INTO usuarios (nombre_completo, correo_electronico, contrasena_hash, rol_id) VALUES (?, ?, ?, (SELECT id FROM roles WHERE nombre = "cliente"))',
            [nombre_completo, correo_electronico, contrasena_hash]
        );

        const newUserId = result.insertId;

        const payload = {
            userId: newUserId,
            nombre: nombre_completo,
            rol: 'cliente'
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secreto_por_defecto',
            { expiresIn: '10m' }
        );

        res.status(201).json({
            message: 'Usuario registrado exitosamente.',
            token: token,
            // --- CORRECCIÓN AÑADIDA AQUÍ ---
            user: {
                id: newUserId,
                nombre: nombre_completo,
                email: correo_electronico,
                rol: 'cliente'
            }
        });

    } catch (error: any) {
        console.error("Error en registro:", error);
        res.status(500).json({ message: 'Error en el servidor.', error: error.message });
    }
};

// --- FUNCIÓN DE LOGIN MEJORADA Y COMPLETADA ---
export const loginUser = async (req: Request, res: Response) => {
    console.log("El servidor recibió en req.body:", req.body);
    const { correo_electronico, contrasena  } = req.body;

    if (!correo_electronico || !contrasena ) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos.' });
    }

    try {
        const [rows]: any = await pool.query(
            'SELECT u.*, r.nombre as rol_nombre FROM usuarios u JOIN roles r ON u.rol_id = r.id WHERE u.correo_electronico = ?',
            [correo_electronico]
        );

        const user = rows[0];
        
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
            rol: user.rol_nombre
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secreto_por_defecto',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Inicio de sesión exitoso.',
            token: token,
            // --- CORRECCIÓN AÑADIDA AQUÍ ---
            user: {
                id: user.id,
                nombre: user.nombre_completo,
                email: user.correo_electronico,
                rol: user.rol_nombre
            }
        });

    } catch (error: any) {
        console.error("Error en login:", error);
        res.status(500).json({ message: 'Error en el servidor.', error: error.message });
    }
};

// --- NUEVA FUNCIÓN PARA RUTA PROTEGIDA ---
export const getUserProfile = async (req: any, res: Response) => {
  const userId = req.user.userId;

  try {
    const [rows]: any = await pool.query(
      'SELECT id, nombre_completo, correo_electronico FROM usuarios WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json(rows[0]);

  } catch (error: any) {
    res.status(500).json({ message: 'Error en el servidor.', error: error.message });
  }
};