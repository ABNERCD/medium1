import { type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db';


export const registerUser = async (req: Request, res: Response) => {
    const { nombre_completo, correo_electronico, password } = req.body;

    if (!nombre_completo || !correo_electronico || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    try {
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const contrasena_hash = await bcrypt.hash(password, salt);

        // Guardar en la base de datos
        await pool.query(
            'INSERT INTO usuarios (nombre_completo, correo_electronico, contrasena_hash, rol_id) VALUES (?, ?, ?, (SELECT id FROM roles WHERE nombre = "cliente"))',
            [nombre_completo, correo_electronico, contrasena_hash]
        );

        res.status(201).json({ message: 'Usuario registrado exitosamente.' });

    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'El correo electrónico ya está registrado.' });
        }
        res.status(500).json({ message: 'Error en el servidor.', error: error.message });
    }
};


export const loginUser = async (req: Request, res: Response) => {
    const { correo_electronico, password } = req.body;

    if (!correo_electronico || !password) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos.' });
    }

    try {
        // 1. Buscar al usuario por su correo en la base de datos
        const [rows]: any = await pool.query(
            'SELECT * FROM usuarios WHERE correo_electronico = ?',
            [correo_electronico]
        );

        const user = rows[0];
        if (!user) {
            return res.status(404).json({ message: 'El usuario no existe.' });
        }

        // 2. Comparar la contraseña enviada con el hash guardado
        const isMatch = await bcrypt.compare(password, user.contrasena_hash);

        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        // Si todo es correcto, el login es exitoso
        // (Más adelante, aquí es donde generarías un token JWT)
        res.status(200).json({ 
            message: 'Inicio de sesión exitoso.',
            usuario: {
                id: user.id,
                nombre: user.nombre_completo,
                rol: user.rol_id // O podrías hacer un JOIN para obtener el nombre del rol
            }
        });

    } catch (error: any) {
        res.status(500).json({ message: 'Error en el servidor.', error: error.message });
    }
};