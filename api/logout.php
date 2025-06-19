<?php
declare(strict_types=1);
require __DIR__.'/database.php';
session_start();
header('Content-Type: application/json');

function logoutUser(): bool
{
    session_start();
    session_unset();
    session_destroy();
    return true;
}

$success = logoutUser();
echo json_encode(['success' => $success]);
