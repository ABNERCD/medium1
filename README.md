# 🔐 Legacy Vault — Bóveda de Legado Digital y Físico

Plataforma web responsiva (Mobile-First) para resguardar archivos digitales cifrados y vincular un casillero físico, con liberación a beneficiarios tras validar el deceso del titular.

**Stack:** React + Vite + TypeScript + Tailwind CSS · Node.js + Express + TypeScript + Prisma · PostgreSQL · Multer (almacenamiento local en `server/uploads/`).

---

## 🖥️ Instalación en una computadora nueva

Requisitos: **Node.js 20+** y **Git**. No necesitas instalar PostgreSQL: el proyecto trae una instancia embebida.

```powershell
git clone https://github.com/ABNERCD/medium1.git legacy-vault
cd legacy-vault

# 1. Dependencias
cd server; npm install
cd ..\client; npm install
cd ..

# 2. Variables de entorno (no se suben a GitHub)
copy server\.env.example server\.env

# 3. Base de datos: iniciar PostgreSQL (deja esta terminal abierta)
cd server; node start-pg.js
```

En **otra terminal**, crea las tablas:
```powershell
cd legacy-vault\server
npx prisma migrate deploy
```

## ▶️ Ejecutar

Doble clic en **`iniciar-vault.bat`**, o manualmente:

```powershell
# Terminal 1
cd server; node start-pg.js
# Terminal 2
cd server; npm run dev        # http://localhost:4000
# Terminal 3
cd client; npm run dev -- --port 5175   # http://localhost:5175
```

Verificar backend + base de datos: `cd server; node test-health.js`

## 📡 Endpoints

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| GET | `/api/health` | Estado del servidor y la base de datos |
| POST | `/api/files/upload` | Subir archivo (campo `file`, `user_id`, `iv_hash`) |
| GET | `/api/files` | Listar archivos |
| GET | `/api/users` | Listar usuarios con casilleros, beneficiarios y archivos |
| PATCH | `/api/users/:id/status` | Cambiar estatus (`ACTIVE` / `DECEASED`); al marcar `DECEASED` se desbloquean los archivos |

> La interfaz actual es una maqueta con datos de ejemplo; aún no está conectada a la API ni cifra archivos realmente.
