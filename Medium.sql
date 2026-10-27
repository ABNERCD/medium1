-- Creación de base de datos si no existe
CREATE DATABASE IF NOT EXISTS medium1 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE medium1;

-- -----------------------------------------------------
-- Tabla `roles`
-- Catálogo con los dos roles disponibles en el sistema.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS roles (
  id TINYINT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  descripcion TEXT
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Insertamos los dos únicos roles disponibles.
-- -----------------------------------------------------
INSERT INTO roles (nombre, descripcion) VALUES
  ('admin', 'Acceso total al sistema para gestionar usuarios y trámites.'),
  ('cliente', 'Acceso limitado para ver el estado de sus propios trámites y subir archivos.')
ON DUPLICATE KEY UPDATE descripcion = VALUES(descripcion);

-- -----------------------------------------------------
-- Tabla `usuarios`
-- Almacena los datos de cada usuario y hace referencia a su rol.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  
  -- Campos de información personal.
  nombre_completo VARCHAR(255) NOT NULL,
  correo_electronico VARCHAR(255) NOT NULL UNIQUE,
  numero_telefono VARCHAR(50) UNIQUE,
  
  -- Campo para la contraseña ya encriptada (hash bcrypt).
  contrasena_hash VARCHAR(255) NOT NULL,
  
  -- Campos de estado y verificación.
  esta_activo BOOLEAN NOT NULL DEFAULT TRUE,
  correo_verificado BOOLEAN NOT NULL DEFAULT FALSE,
  telefono_verificado BOOLEAN NOT NULL DEFAULT FALSE,
  
  -- Campos para los códigos de verificación.
  codigo_verificacion VARCHAR(255),
  expiracion_codigo TIMESTAMP NULL,
  
  -- Fecha de creación del registro.
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Llave foránea que conecta al usuario con su rol.
  rol_id TINYINT NOT NULL,
  FOREIGN KEY (rol_id) REFERENCES roles(id)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Inserciones de usuarios de prueba (contraseñas encriptadas):
-- Admin: admin.prueba@lexprocess.com / admin_password_123
-- Cliente: cliente.prueba@lexprocess.com / cliente_password_123
-- -----------------------------------------------------
INSERT INTO usuarios 
    (nombre_completo, correo_electronico, contrasena_hash, rol_id) 
VALUES 
    (
        'Administrador Principal', 
        'admin.prueba@lexprocess.com', 
        '$2b$10$dN6VyNEt2rWihEzSo2XkkurS/TGzArv6X32j0HdL6/IFNg68UZUDa', 
        (SELECT id FROM roles WHERE nombre = 'admin')
    )
ON DUPLICATE KEY UPDATE contrasena_hash = '$2b$10$dN6VyNEt2rWihEzSo2XkkurS/TGzArv6X32j0HdL6/IFNg68UZUDa';

INSERT INTO usuarios 
    (nombre_completo, correo_electronico, contrasena_hash, rol_id) 
VALUES 
    (
        'Cliente de Ejemplo', 
        'cliente.prueba@lexprocess.com', 
        '$2b$10$VCwiwuhn1EsU27dq52pO7OWLB53SdepN/3LkZSZ/RNVVbaznxH7Ga', 
        (SELECT id FROM roles WHERE nombre = 'cliente')
    )
ON DUPLICATE KEY UPDATE contrasena_hash = '$2b$10$VCwiwuhn1EsU27dq52pO7OWLB53SdepN/3LkZSZ/RNVVbaznxH7Ga';
