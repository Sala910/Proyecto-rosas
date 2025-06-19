<?php
declare(strict_types=1);

// Carga la conexión a la base de datos
require __DIR__ . '/database.php';

// Siempre respondemos JSON
header('Content-Type: application/json; charset=utf-8');

// Ajustes de cookie para que funcione en localhost sin HTTPS
session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'domain'   => '',      // si no usas dominio personalizado
    'secure'   => false,   // en producción ponlo a true
    'httponly' => true,
    'samesite' => 'Lax'
]);

// Arranca la sesión (necesario para luego validar $_SESSION)
session_start();

// Obtiene el cuerpo raw y lo decodifica
$raw = file_get_contents('php://input');
$input = json_decode($raw, true);

// Si no vino un JSON válido, respondemos error 400
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error'   => 'JSON inválido'
    ]);
    exit;
}

$email    = trim($input['email']    ?? '');
$password =            $input['password'] ?? '';

// Conexión a la BD
$pdo = connectDB();
if (!$pdo) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'No se pudo conectar con la base de datos'
    ]);
    exit;
}

/**
 * Intenta autenticar al usuario y deja su ID en $_SESSION
 */
function loginUser(PDO $pdo, string $email, string $password): array
{
    // validación mínima
    if ($email === '' || $password === '') {
        return ['success' => false];
    }

    // buscamos el usuario por email
    $stmt = $pdo->prepare(
      'SELECT id, email, nombre, password_hash
         FROM usuarios
        WHERE email = :email
        LIMIT 1'
    );
    $stmt->bindValue(':email', $email, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // si existe y la contraseña coincide
    if ($user && password_verify($password, (string)$user['password_hash'])) {
        // regeneramos sesión y guardamos user_id
        session_regenerate_id(true);
        $_SESSION['user_id'] = (int)$user['id'];

        return [
            'success' => true,
            'user'    => [
                'id'     => (int)$user['id'],
                'email'  => $user['email'],
                'nombre' => $user['nombre']
            ]
        ];
    }

    // si falla
    return ['success' => false];
}

// Ejecutamos el login y devolvemos la respuesta
$out = loginUser($pdo, $email, $password);
echo json_encode($out);
