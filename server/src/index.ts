import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

// Asegurar que exista la carpeta uploads
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración de Multer para almacenamiento local en server/uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${uniqueSuffix}-${sanitizedName}.enc`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Límite de 100MB por archivo
});

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// ==========================================
// 1. ENDPOINT DE SALUD (GET /api/health)
// ==========================================
app.get('/api/health', async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: 'OK',
      service: 'Legacy Vault API - Bóveda de Legado Digital y Físico',
      database: 'CONNECTED',
      storage: uploadsDir,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(200).json({
      status: 'OK',
      service: 'Legacy Vault API - Bóveda de Legado Digital y Físico',
      database: 'STANDBY',
      dbMessage: error.message,
      storage: uploadsDir,
      timestamp: new Date().toISOString(),
    });
  }
});

// ==========================================
// 2. ENDPOINTS DE ARCHIVOS Y MULTER
// ==========================================
app.post('/api/files/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No se recibió ningún archivo.' });
      return;
    }

    const { user_id, iv_hash } = req.body;
    const parsedUserId = Number(user_id) || 1;

    const savedFile = await prisma.file.create({
      data: {
        original_name: req.file.originalname,
        encrypted_path: req.file.path,
        mime_type: req.file.mimetype,
        iv_hash: iv_hash || 'aes-256-gcm-iv-default',
        is_locked: true,
        user_id: parsedUserId,
      },
    });

    res.status(201).json({
      message: 'Archivo cifrado y almacenado en bóveda exitosamente.',
      file: savedFile,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al registrar el archivo.', details: error.message });
  }
});

app.get('/api/files', async (_req: Request, res: Response) => {
  try {
    const files = await prisma.file.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(files);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 3. ENDPOINTS DE USUARIOS Y PROTOCOLO POST-MORTEM
// ==========================================
app.get('/api/users', async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { lockers: true, beneficiaries: true, files: true },
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/users/:id/status', async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    const { status } = req.body; // 'ACTIVE' | 'DECEASED'

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { status },
    });

    // Si pasa a DECEASED, desbloqueamos sus archivos para los beneficiarios
    if (status === 'DECEASED') {
      await prisma.file.updateMany({
        where: { user_id: userId },
        data: { is_locked: false },
      });
    }

    res.json({
      message: `Estado del usuario actualizado a ${status}`,
      user: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Legacy Vault Server corriendo en http://localhost:${PORT}`);
  console.log(`📁 Carpeta de almacenamiento cifrado: ${uploadsDir}`);
});
