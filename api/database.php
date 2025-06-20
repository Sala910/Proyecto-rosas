<?php
declare(strict_types=1);
// ——————————————————————————————————————————
// ¡NI UN SOLO carácter antes de este <?php!
// ——————————————————————————————————————————

/**
 * Abre (o crea) la conexión PDO a SQLite con timeout y WAL.
 */
function connectDB(): ?PDO
{
    $dbFile = __DIR__ . '/data.sqlite';
    if (!file_exists($dbFile)) {
        error_log("connectDB: fichero SQLite no existe: $dbFile");
        return null;
    }
    try {
        // 1) Conecta
        $pdo = new PDO("sqlite:$dbFile");
        // 2) Modo de errores: excepciones
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // 3) Espera hasta 5 segundos si hay un bloqueo
        $pdo->setAttribute(PDO::ATTR_TIMEOUT, 5);
        // 4) Asegura WAL para reducir bloqueos
        $pdo->exec('PRAGMA journal_mode = WAL;');
        // 5) Opcional: forzar fetch por defecto en associative arrays
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $pdo;
    } catch (Exception $e) {
        error_log("connectDB error: " . $e->getMessage());
        return null;
    }
}
