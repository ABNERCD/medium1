// En: server/src/controllers/auth.controller.ts

import { type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Importamos jsonwebtoken
import pool from '../config/db';

// --- FUNCIÓN DE REGISTRO MEJORADA ---
export const registerUser = async (req: Request, res: Response) => {
    const { nombre_completo, correo_electronico, password } = req.body;

    if (!nombre_completo || !correo_electronico || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    try {
        // Mejora: Verificar si el usuario ya existe antes de intentar insertar
        const [existingUser]: any = await pool.query(
            'SELECT id FROM usuarios WHERE correo_electronico = ?',
            [correo_electronico]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'El correo electrónico ya está registrado.' });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const contrasena_hash = await bcrypt.hash(password, salt);

        // Guardar en la base de datos y obtener el ID del nuevo usuario
        const [result]: any = await pool.query(
            'INSERT INTO usuarios (nombre_completo, correo_electronico, contrasena_hash, rol_id) VALUES (?, ?, ?, (SELECT id FROM roles WHERE nombre = "cliente"))',
            [nombre_completo, correo_electronico, contrasena_hash]
        );

        const newUserId = result.insertId;

        // --- COMPLETADO: Generar JWT para auto-login ---
        const payload = {
            userId: newUserId,
            nombre: nombre_completo,
            rol: 'cliente' // Asignamos rol directamente
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secreto_por_defecto',
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'Usuario registrado exitosamente.',
            token: token
        });

    } catch (error: any) {
        console.error("Error en registro:", error);
        res.status(500).json({ message: 'Error en el servidor.', error: error.message });
    }
};

// --- FUNCIÓN DE LOGIN MEJORADA Y COMPLETADA ---
export const loginUser = async (req: Request, res: Response) => {
    const { correo_electronico, password } = req.body;

    if (!correo_electronico || !password) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos.' });
    }

    try {
        // Mejora: Unir con la tabla de roles para obtener el nombre del rol
        const [rows]: any = await pool.query(
            'SELECT u.*, r.nombre as rol_nombre FROM usuarios u JOIN roles r ON u.rol_id = r.id WHERE u.correo_electronico = ?',
            [correo_electronico]
        );

        const user = rows[0];
        
        // Mejora de seguridad: Mensaje de error genérico para no revelar si un usuario existe
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // Comparar la contraseña enviada con el hash guardado
        const isMatch = await bcrypt.compare(password, user.contrasena_hash);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // --- COMPLETADO: Generar y enviar el JWT ---
        const payload = {
            userId: user.id,
            nombre: user.nombre_completo,
            rol: user.rol_nombre
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secreto_por_defecto',
            { expiresIn: '1h' } // El token expira en 1 hora
        );

        res.status(200).json({
            message: 'Inicio de sesión exitoso.',
            token: token,
        });

    } catch (error: any) {
        console.error("Error en login:", error);
        res.status(500).json({ message: 'Error en el servidor.', error: error.message });
    }
};

// --- NUEVA FUNCIÓN PARA RUTA PROTEGIDA ---
export const getUserProfile = async (req: any, res: Response) => {
  // Gracias al middleware, ahora tenemos acceso a 'req.user'
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