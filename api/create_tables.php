<?php
declare(strict_types=1);
require __DIR__ . '/database.php';  // ahora sí debe encontrarse

/**
 * Ejecuta el esquema de creación de tablas
 */
function setupSchema(PDO $pdo): bool
{
    $sql = "
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      nombre TEXT NOT NULL,
      creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      detalles TEXT NOT NULL,
      total REAL NOT NULL,
      creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    );
    ";
    try {
        $pdo->exec($sql);
        return true;
    } catch (Exception $e) {
        error_log('Error al crear tablas: ' . $e->getMessage());
        return false;
    }
}

// ——— EJECUCIÓN ———
$pdo = connectDB();
if ($pdo === null) {
    http_response_code(500);
    exit('No fue posible conectar a la base de datos.');
}

if (setupSchema($pdo)) {
    echo 'Tablas creadas correctamente.';
} else {
    http_response_code(500);
    exit('Falló la creación de las tablas.');
}
