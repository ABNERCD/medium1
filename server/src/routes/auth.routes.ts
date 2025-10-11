import { Router } from 'express';
// AQUÍ VA LA LÍNEA:
import { registerUser, loginUser } from '../controllers/auth.controller';

const router = Router();

// Define qué función se ejecuta para cada ruta
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;