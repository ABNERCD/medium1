@echo off
chcp 65001 > nul
echo =========================================================
echo   INICIANDO BÓVEDA DE LEGADO DIGITAL Y FÍSICO (LOCAL)
echo =========================================================

cd /d "%~dp0"

echo [*] 1. Verificando instancia PostgreSQL local (puerto 5432)...
netstat -ano | findstr ":5432.*LISTENING" > nul
if %errorlevel% neq 0 (
    echo [*] Levantando PostgreSQL embebido...
    start "PostgreSQL Legacy Vault" /MIN cmd /c "cd server && node start-pg.js && pause"
    timeout /t 4 /nobreak > nul
)

echo [*] 2. Iniciando Backend Express + Prisma (http://localhost:4000)...
start "Legacy Vault Server" cmd /k "cd server && npm run dev"

echo [*] 3. Iniciando Frontend React + Tailwind (Vite)...
start "Legacy Vault Client" cmd /k "cd client && npm run dev -- --port 5175 --strictPort"

timeout /t 3 /nobreak > nul
start http://localhost:5175
