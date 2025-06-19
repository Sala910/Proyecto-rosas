<?php
declare(strict_types=1);
require __DIR__.'/database.php';
session_start();
header('Content-Type: application/json');

// Leer JSON de {"id": 2}
$raw = file_get_contents('php://input');
$in  = json_decode($raw, true);
$id  = isset($in['id']) ? intval($in['id']) : 0;

// Validar
if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['success'=>false, 'error'=>'ID inválido']);
    exit;
}

// Borrar
$pdo = connectDB();
if (!$pdo) {
    http_response_code(500);
    echo json_encode(['success'=>false, 'error'=>'Error de conexión DB']);
    exit;
}

try {
    $stmt = $pdo->prepare('DELETE FROM usuarios WHERE id = :id');
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $ok = $stmt->rowCount() > 0;
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success'=>false, 'error'=>'Error al borrar']);
    exit;
}

echo json_encode(['success'=>$ok]);
