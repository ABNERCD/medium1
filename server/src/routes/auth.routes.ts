// En: server/src/routes/auth.routes.ts

import { Router } from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// --- Rutas Públicas ---
router.post('/register', registerUser);
router.post('/login', loginUser);

// --- Rutas Protegidas ---
router.get('/profile', protect, getUserProfile);

// Esta es la línea clave que debe estar en ESTE archivo
export default router;