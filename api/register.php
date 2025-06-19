<?php
declare(strict_types=1);

// 1) Forzamos cookie de sesión y arrancamos sesión
session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'domain'   => '',
    'secure'   => false,
    'httponly' => true,
    'samesite' => 'None'
]);
session_start();

// 2) Salida JSON
header('Content-Type: application/json');

// 3) Depuración del raw input
$raw = file_get_contents('php://input');
error_log(">>> register.php RAW INPUT: [$raw]");

// 4) Decodificar JSON
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

// 5) Validar campos obligatorios
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

// 6) Conectar a la base de datos
require __DIR__ . '/database.php';
$pdo = connectDB();
if (!$pdo) {
    echo json_encode([
      'success' => false,
      'error'   => 'No se pudo conectar a la base de datos'
    ]);
    exit;
}

// 7) Comprobar email duplicado
try {
    $chk = $pdo->prepare('SELECT COUNT(*) FROM usuarios WHERE email = :e');
    $chk->bindParam(':e', $email);
    $chk->execute();
    if ((int)$chk->fetchColumn() > 0) {
        echo json_encode([
          'success' => false,
          'error'   => 'Email ya registrado'
        ]);
        exit;
    }
} catch (Exception $e) {
    error_log("register.php DUPLICADO EXCEP: " . $e->getMessage());
    echo json_encode([
      'success' => false,
      'error'   => 'Error al verificar email duplicado'
    ]);
    exit;
}

// 8) Insertar nuevo usuario (¡ojo al orden!)
$hash = password_hash($pass, PASSWORD_BCRYPT);
try {
    $ins = $pdo->prepare(
      'INSERT INTO usuarios (email, nombre, password_hash)
       VALUES (:email, :nombre, :hash)'
    );
    $ins->bindParam(':email',  $email);
    $ins->bindParam(':nombre', $nombre);
    $ins->bindParam(':hash',   $hash);
    $ins->execute();

    // 9) Creamos la sesión y devolvemos éxito + datos
    session_regenerate_id(true);
    $_SESSION['user_id'] = (int)$pdo->lastInsertId();

    echo json_encode([
      'success' => true,
      'user'    => [
        'id'    => $_SESSION['user_id'],
        'email' => $email,
        'name'  => $nombre
      ]
    ]);
    exit;

} catch (Exception $e) {
    error_log("register.php INSERT EXCEP: " . $e->getMessage());
    echo json_encode([
      'success' => false,
      'error'   => 'Error al insertar usuario'
    ]);
    exit;
}
