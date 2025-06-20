<?php
declare(strict_types=1);
// ——————————————————————————————————————————
// ¡Nada de espacios, BOM o texto antes de este <?php!
// ——————————————————————————————————————————

ini_set('display_errors', '0');
error_reporting(E_ALL);

// Sesión
session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'domain'   => '',
    'secure'   => false,
    'httponly' => true,
    'samesite' => 'Lax'
]);
session_start();

header('Content-Type: application/json; charset=utf-8');

// RAW input para debug
$raw = file_get_contents('php://input');
error_log(">>> register.php RAW INPUT: [$raw]");

$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error'   => 'JSON inválido o Content-Type incorrecto',
        'raw'     => $raw
    ]);
    exit;
}

$email  = trim($data['email']    ?? '');
$pass   = trim($data['password'] ?? '');
$nombre = trim($data['nombre']   ?? '');

if ($email === '' || $pass === '' || $nombre === '') {
    echo json_encode([
      'success' => false,
      'error'   => 'Faltan campos: email, password y nombre son requeridos'
    ]);
    exit;
}

require __DIR__ . '/database.php';
$pdo = connectDB();
if (!$pdo) {
    echo json_encode([
      'success' => false,
      'error'   => 'No se pudo conectar a la base de datos'
    ]);
    exit;
}

try {
    // Verificar duplicado
    $chk = $pdo->prepare('SELECT 1 FROM usuarios WHERE email = :e');
    $chk->bindParam(':e', $email);
    $chk->execute();
    if ($chk->fetch()) {
        echo json_encode([
          'success' => false,
          'error'   => 'Email ya registrado'
        ]);
        exit;
    }

    // Hash y INSERT usando el mismo orden de columnas de tu tabla
    $hash = password_hash($pass, PASSWORD_BCRYPT);
    $ins = $pdo->prepare(
      'INSERT INTO usuarios (email, password_hash, nombre)
       VALUES (:email, :hash, :nombre)'
    );
    $ins->bindParam(':email',  $email);
    $ins->bindParam(':hash',   $hash);
    $ins->bindParam(':nombre', $nombre);
    $ins->execute();

    session_regenerate_id(true);
    $uid = (int)$pdo->lastInsertId();
    $_SESSION['user_id'] = $uid;

    echo json_encode([
      'success' => true,
      'user'    => [
        'id'    => $uid,
        'email' => $email,
        'name'  => $nombre
      ]
    ]);
    exit;

} catch (Exception $e) {
    error_log("register.php EXCEP: " . $e->getMessage());
    echo json_encode([
      'success' => false,
      'error'   => 'Error al insertar usuario',
      'detail'  => $e->getMessage()  // <-- detalle de la excepción
    ]);
    exit;
}
