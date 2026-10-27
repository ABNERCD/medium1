@echo off
chcp 65001 > nul
echo ====================================================
echo      INICIANDO PLATAFORMA MEDIUM (LexProcess)
echo ====================================================
echo.

netstat -ano | findstr ":3306.*LISTENING" > nul
if %errorlevel% neq 0 (
    echo [*] El servicio MySQL no se detecta activo.
    if exist "C:\xampp\mysql\bin\mysqld.exe" (
        echo [*] Iniciando MySQL desde XAMPP en segundo plano...
        start "" /B "C:\xampp\mysql\bin\mysqld.exe" --defaults-file="C:\xampp\mysql\bin\my.ini" --standalone
        timeout /t 3 /nobreak > nul
        echo [OK] MySQL iniciado.
    ) else (
        echo [!] ADVERTENCIA: Asegúrate de tener MySQL iniciado en el puerto 3306.
    )
) else (
    echo [OK] MySQL ya se encuentra activo en el puerto 3306.
)

cd /d "%~dp0"
echo.
echo [*] Iniciando Backend (http://localhost:3001) y Frontend (http://localhost:5173)...
echo.

start "" cmd /c "timeout /t 4 /nobreak > nul & start http://localhost:5173"

call npm run dev

pause
