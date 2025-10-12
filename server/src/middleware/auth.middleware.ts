// En: server/src/middleware/auth.middleware.ts

import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extendemos la interfaz Request de Express para añadir nuestra propiedad 'user'
interface AuthRequest extends Request {
  user?: { userId: number, nombre: string, rol: string };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  // 1. Buscamos el token en la cabecera 'Authorization'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extraemos el token del string 'Bearer <token>'
      token = req.headers.authorization.split(' ')[1];

      // 3. Verificamos el token con nuestra clave secreta
      const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET || 'secreto_por_defecto'
      ) as { userId: number, nombre: string, rol: string };

      // 4. Si es válido, añadimos los datos del usuario al objeto 'req'
      // Esto permite que los siguientes controladores tengan acceso a la info del usuario
      req.user = decoded;

      // 5. Continuamos con el siguiente middleware o controlador
      next();

    } catch (error) {
      console.error('Error de autenticación:', error);
      return res.status(401).json({ message: 'No autorizado, token inválido.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No autorizado, no se encontró token.' });
  }
};