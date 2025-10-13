import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // <-- 1. IMPORTA CORS AQUÍ
import authRoutes from './routes/auth.routes'; // <-- IMPORTA LAS RUTAS

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors()); // <-- 2. USA CORS AQUÍ (ANTES DE LAS RUTAS)
app.use(express.json()); // <-- PERMITE QUE EXPRESS ENTIENDA JSON

// Rutas
app.get('/api', (req: Request, res: Response) => {
    res.json({ message: '¡API de LexProcess funcionando!' });
});

app.use('/api/auth', authRoutes); // <-- USA LAS RUTAS DE AUTENTICACIÓN

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});