-- Usamos la base de datos que creaste.
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
-- Insertamos los dos únicos roles que necesitas.
-- -----------------------------------------------------
INSERT INTO roles (nombre, descripcion) VALUES
  ('admin', 'Acceso total al sistema para gestionar usuarios y trámites.'),
  ('cliente', 'Acceso limitado para ver el estado de sus propios trámites y subir archivos.');


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
  
  -- Campo para la contraseña ya encriptada (hash).
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


-- Insercciones de usuarios prueba 

-- Inserta un usuario de prueba con el rol de 'admin'.
INSERT INTO usuarios 
    (nombre_completo, correo_electronico, contrasena_hash, rol_id) 
VALUES 
    (
        'Administrador Principal', 
        'admin.prueba@lexprocess.com', 
        'hash_de_prueba_admin_123', 
        (SELECT id FROM roles WHERE nombre = 'admin') -- Busca el ID del rol 'admin' automáticamente
    );
    
    
    -- Inserta un usuario de prueba con el rol de 'cliente'.
INSERT INTO usuarios 
    (nombre_completo, correo_electronico, contrasena_hash, rol_id) 
VALUES 
    (
        'Cliente de Ejemplo', 
        'cliente.prueba@lexprocess.com', 
        'hash_de_prueba_cliente_456', 
        (SELECT id FROM roles WHERE nombre = 'cliente') -- Busca el ID del rol 'cliente' automáticamente
    );
    
    
UPDATE usuarios 
SET contrasena_hash = '$2b$10$Umd.ix5borSD4j/XUhw2t.QSsapA7RNBuZIZLMS8/Kb08hf4WEg7i' 
WHERE correo_electronico = 'admin.prueba@lexprocess.com';