<?php
declare(strict_types=1);
require __DIR__ . '/database.php';

header('Content-Type: application/json');
session_start();

// -----------------------------------------------------------------
// Auxiliares para crear y listar pedidos
// -----------------------------------------------------------------
function createOrder(PDO $pdo, int $userId, string $detalles, float $total): bool
{
    if ($userId <= 0 || $detalles === '' || $total <= 0.0) {
        return false;
    }
    $sql = 'INSERT INTO pedidos (usuario_id, detalles, total)
            VALUES (:uid, :det, :tot)';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':uid', $userId, PDO::PARAM_INT);
    $stmt->bindParam(':det', $detalles, PDO::PARAM_STR);
    $stmt->bindParam(':tot', $total);
    try {
        $stmt->execute();
        return true;
    } catch (Exception $e) {
        error_log("createOrder error: " . $e->getMessage());
        return false;
    }
}

function listOrders(PDO $pdo, int $userId): array
{
    if ($userId <= 0) {
        return [];
    }
    $sql = 'SELECT id, detalles, total, creado_en
              FROM pedidos
             WHERE usuario_id = :uid
          ORDER BY creado_en DESC';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':uid', $userId, PDO::PARAM_INT);
    try {
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        error_log("listOrders error: " . $e->getMessage());
        return [];
    }
}

// -----------------------------------------------------------------
// Dispatcher: POST = crear, GET = listar
// -----------------------------------------------------------------
$pdo    = connectDB();
$userId = (int)($_SESSION['user_id'] ?? 0);

if (!$pdo) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'DB error']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw   = file_get_contents('php://input');
    $input = json_decode($raw, true);
    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'JSON inválido']);
        exit;
    }

    $detalles = $input['detalles'] ?? '';
    $total    = floatval($input['total'] ?? 0);

    $ok = createOrder($pdo, $userId, $detalles, $total);
    echo json_encode(['success' => $ok]);
    exit;
}

// GET
$orders = listOrders($pdo, $userId);
echo json_encode(['orders' => $orders]);
