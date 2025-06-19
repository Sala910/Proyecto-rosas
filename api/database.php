<?php
declare(strict_types=1);

/**
 * Abre (o crea) la conexión PDO a SQLite.
 */
function connectDB(): ?PDO
{
    $dbFile = __DIR__ . '/data.sqlite';
    if (!file_exists($dbFile)) {
        error_log("connectDB: fichero SQLite no existe: $dbFile");
        return null;
    }
    try {
        $pdo = new PDO("sqlite:$dbFile");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (Exception $e) {
        error_log("connectDB error: " . $e->getMessage());
        return null;
    }
}
