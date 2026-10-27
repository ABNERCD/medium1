# 🌟 MEDIUM (LexProcess) - Tu Legado Digital

Plataforma integral web para la gestión segura de legados digitales, archivos, recuerdos y voluntades.

---

## 🏗️ Arquitectura del Proyecto

El proyecto está diseñado con una arquitectura cliente-servidor desacoplada:

1. **Frontend (`client/`)**:
   - **Framework:** React 19 + TypeScript impulsado por Vite.
   - **Estilos:** React-Bootstrap + Bootswatch (Darkly) + Animate.css + Iconos FontAwesome.
   - **Enrutamiento:** React Router DOM (v7) con rutas públicas y protegidas mediante `ProtectedRoute`.
   - **Comunicación HTTP:** Axios (`axiosConfig.ts`) con interceptores para inyectar automáticamente el Bearer Token JWT y manejar expiración de sesiones (401).

2. **Backend (`server/`)**:
   - **Entorno:** Node.js + Express + TypeScript.
   - **Base de Datos:** MySQL / MariaDB mediante `mysql2/promise` con pool de conexiones.
   - **Autenticación & Seguridad:** JSON Web Tokens (`jsonwebtoken`) y encriptación de contraseñas con `bcryptjs`.
   - **Control de Acceso:** Middleware `protect` que valida tokens y extrae el usuario autenticado.

3. **Base de Datos (`Medium.sql`)**:
   - Tablas `roles` (`admin`, `cliente`) y `usuarios`.
   - Relación 1:N entre roles y usuarios con claves foráneas.

---

## 🚀 Cómo Ejecutar el Proyecto

### Opción 1: Con un solo clic (Recomendado en Windows)
Haz doble clic sobre el archivo **`iniciar.bat`** (ubicado en la raíz o dentro de `medium1/`). Este script:
1. Comprueba si MySQL está activo (lo inicia automáticamente desde XAMPP si es necesario).
2. Lanza el backend y el frontend simultáneamente.
3. Abre automáticamente tu navegador en `http://localhost:5173`.

### Opción 2: Desde la terminal
Dentro de la carpeta `medium1`:
```bash
# Iniciar ambos (backend y frontend simultáneos)
npm run dev
```

O si prefieres ejecutarlos en terminales separadas:
```bash
# Terminal 1 - Servidor (puerto 3001)
cd server
npm run dev

# Terminal 2 - Cliente Vite (puerto 5173)
cd client
npm run dev
```

---

## 👥 Credenciales de Prueba

La base de datos cuenta con dos usuarios listos para iniciar sesión:

| Rol | Correo Electrónico | Contraseña |
| :--- | :--- | :--- |
| **Administrador** | `admin.prueba@lexprocess.com` | `admin_password_123` |
| **Cliente** | `cliente.prueba@lexprocess.com` | `cliente_password_123` |

También puedes registrar nuevos usuarios directamente desde el formulario de **Registro** en `/register`.

---

## 📡 Endpoints de la API

- `GET /api` - Comprobación de estado del servidor.
- `POST /api/auth/register` - Registro de nuevos usuarios con rol cliente.
- `POST /api/auth/login` - Inicio de sesión y generación de token JWT.
- `GET /api/auth/profile` - Perfil de usuario (Ruta protegida, requiere header `Authorization: Bearer <token>`).
