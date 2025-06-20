<?php
declare(strict_types=1);
// ——————————————————————————————————————————
// ¡Nada antes de este <?php!
// ——————————————————————————————————————————
ini_set('display_errors','0');
ini_set('log_errors','1');
ini_set('error_log', __DIR__ . '/error.log');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');

// Cookies & sesión
session_set_cookie_params([
  'lifetime'=>0, 'path'=>'/', 'domain'=>'',
  'secure'=>false, 'httponly'=>true, 'samesite'=>'Lax'
]);
session_start();

// Conexión a la BD
require __DIR__ . '/database.php';
$pdo = connectDB();
if (!$pdo) {
  http_response_code(500);
  echo json_encode(['success'=>false,'error'=>'DB connection failed']);
  exit;
}

// Usuario autenticado
$userId = (int)($_SESSION['user_id'] ?? 0);
if ($userId <= 0) {
  http_response_code(401);
  echo json_encode(['success'=>false,'error'=>'Not authenticated']);
  exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
  // Crear pedido
  $raw   = file_get_contents('php://input');
  $input = @json_decode($raw, true);
  if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['success'=>false,'error'=>'Invalid JSON']);
    exit;
  }
  $detalles = trim((string)($input['detalles'] ?? ''));
  $total    = isset($input['total']) ? floatval($input['total']) : 0.0;
  $addr     = trim((string)($input['shipping'] ?? '')); 

  if ($detalles === '' || $total <= 0) {
    http_response_code(422);
    echo json_encode(['success'=>false,'error'=>'Missing required fields']);
    exit;
  }

  $sql = <<<SQL
    INSERT INTO pedidos
      (usuario_id, detalles, total, creado_en)
    VALUES
      (:uid, :det, :tot, datetime('now'))
  SQL;
  try {
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':uid',$userId,   PDO::PARAM_INT);
    $stmt->bindValue(':det',$detalles, PDO::PARAM_STR);
    $stmt->bindValue(':tot',$total);
    $stmt->execute();
    echo json_encode(['success'=>true]);
  } catch (PDOException $e) {
    error_log("orders.php INSERT ERROR: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
      'success'=>false,
      'error'=>'Internal server error',
      'detail'=>$e->getMessage()
    ]);
  }
  exit;
}

if ($method === 'GET') {
  // Listar pedidos
  $sql = <<<SQL
    SELECT
      id,
      usuario_id,
      detalles,
      total,
      creado_en
    FROM pedidos
    WHERE usuario_id = :uid
    ORDER BY creado_en DESC
  SQL;
  try {
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':uid',$userId,PDO::PARAM_INT);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['orders'=>$rows]);
  } catch (PDOException $e) {
    error_log("orders.php SELECT ERROR: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
      'success'=>false,
      'error'=>'Internal server error',
      'detail'=>$e->getMessage()
    ]);
  }
  exit;
}

if ($method === 'DELETE') {
  // Borrar pedido
  $raw = file_get_contents('php://input');
  $in  = @json_decode($raw,true);
  $id  = isset($in['id']) ? (int)$in['id'] : 0;
  if ($id <= 0) {
    http_response_code(422);
    echo json_encode(['success'=>false,'error'=>'Missing order ID']);
    exit;
  }
  $sql = "DELETE FROM pedidos WHERE id = :id AND usuario_id = :uid";
  try {
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':id',$id,PDO::PARAM_INT);
    $stmt->bindValue(':uid',$userId,PDO::PARAM_INT);
    $stmt->execute();
    echo json_encode(['success'=>true]);
  } catch (PDOException $e) {
    error_log("orders.php DELETE ERROR: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
      'success'=>false,
      'error'=>'Internal server error',
      'detail'=>$e->getMessage()
    ]);
  }
  exit;
}

// Método no permitido
http_response_code(405);
echo json_encode(['success'=>false,'error'=>'Method not allowed']);
exit;
