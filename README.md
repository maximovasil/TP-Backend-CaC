# TP-Backend-CaC
Trabajo Práctico relacionado al backend del grupo-13 de CaC

-- Crear el usuario si no existe
CREATE USER 'maxi'@'localhost' IDENTIFIED BY 'cac';

-- Otorgar todos los privilegios en la base de datos
GRANT ALL PRIVILEGES ON cac_db.* TO 'maxi'@'localhost';

-- Aplicar los cambios
FLUSH PRIVILEGES;
