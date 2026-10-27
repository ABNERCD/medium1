import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import pool from './config/db';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.get('/api', (req: Request, res: Response) => {
    res.json({ message: '¡API de LexProcess/Medium funcionando!' });
});

app.use('/api/auth', authRoutes);

app.listen(PORT, async () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    try {
        await pool.query('SELECT 1');
        console.log('✅ Conexión con la base de datos MySQL establecida correctamente.');
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos MySQL:', error);
    }
});
