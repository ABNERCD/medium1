# ðŸŒŸ MEDIUM (LexProcess) - Tu Legado Digital

Plataforma integral web para la gestiÃ³n segura de legados digitales, archivos, recuerdos y voluntades.

---

## ðŸ—ï¸ Arquitectura del Proyecto

El proyecto estÃ¡ diseÃ±ado con una arquitectura cliente-servidor desacoplada:

1. **Frontend (`client/`)**:
   - **Framework:** React 19 + TypeScript impulsado por Vite.
   - **Estilos:** React-Bootstrap + Bootswatch (Darkly) + Animate.css + Iconos FontAwesome.
   - **Enrutamiento:** React Router DOM (v7) con rutas pÃºblicas y protegidas mediante `ProtectedRoute`.
   - **ComunicaciÃ³n HTTP:** Axios (`axiosConfig.ts`) con interceptores para inyectar automÃ¡ticamente el Bearer Token JWT y manejar expiraciÃ³n de sesiones (401).

2. **Backend (`server/`)**:
   - **Entorno:** Node.js + Express + TypeScript.
   - **Base de Datos:** MySQL / MariaDB mediante `mysql2/promise` con pool de conexiones.
   - **AutenticaciÃ³n & Seguridad:** JSON Web Tokens (`jsonwebtoken`) y encriptaciÃ³n de contraseÃ±as con `bcryptjs`.
   - **Control de Acceso:** Middleware `protect` que valida tokens y extrae el usuario autenticado.

3. **Base de Datos (`Medium.sql`)**:
   - Tablas `roles` (`admin`, `cliente`) y `usuarios`.
   - RelaciÃ³n 1:N entre roles y usuarios con claves forÃ¡neas.

---

## ðŸš€ CÃ³mo Ejecutar el Proyecto

### OpciÃ³n 1: Con un solo clic (Recomendado en Windows)
Haz doble clic sobre el archivo **`iniciar.bat`** (ubicado en la raÃ­z o dentro de `medium1/`). Este script:
1. Comprueba si MySQL estÃ¡ activo (lo inicia automÃ¡ticamente desde XAMPP si es necesario).
2. Lanza el backend y el frontend simultÃ¡neamente.
3. Abre automÃ¡ticamente tu navegador en `http://localhost:5173`.

### OpciÃ³n 2: Desde la terminal
Dentro de la carpeta `medium1`:
```bash
# Iniciar ambos (backend y frontend simultÃ¡neos)
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

## ðŸ‘¥ Credenciales de Prueba

La base de datos cuenta con dos usuarios listos para iniciar sesiÃ³n:

| Rol | Correo ElectrÃ³nico | ContraseÃ±a |
| :--- | :--- | :--- |
| **Administrador** | `admin.prueba@lexprocess.com` | `admin_password_123` |
| **Cliente** | `cliente.prueba@lexprocess.com` | `cliente_password_123` |

TambiÃ©n puedes registrar nuevos usuarios directamente desde el formulario de **Registro** en `/register`.

---

## ðŸ“¡ Endpoints de la API

- `GET /api` - ComprobaciÃ³n de estado del servidor.
- `POST /api/auth/register` - Registro de nuevos usuarios con rol cliente.
- `POST /api/auth/login` - Inicio de sesiÃ³n y generaciÃ³n de token JWT.
- `GET /api/auth/profile` - Perfil de usuario (Ruta protegida, requiere header `Authorization: Bearer <token>`).
