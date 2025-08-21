<?php

header('Content-Type: application/json'); // Indica que la comunicación entre Cliente y Servidor será JSON

$respuesta = [
    'status'  => 'error al enviar datos en formulario',
    'mensaje' => 'datos no recibidos o inválidos.',
    'enviados'=> 'ningún dato recibido'
];

try {
    // solicitar una conexión a la base de datos
    $conexion = require './conexion.php';
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sentencia = $conexion->prepare("select * from usuarios where conectado = true;");
    $sentencia->execute();

    // set the resulting array to associative
    $sentencia->setFetchMode(PDO::FETCH_ASSOC);
    $result = $sentencia->fetchAll();

    $respuesta['status']  = 'exito';
    $respuesta['mensaje'] = 'consulta exitosa';
    $respuesta['enviados'] = $result;

    $conexion = null; // cerrar la conexión a la base de datos

} catch (PDOException $e) {
    $respuesta['mensaje'] = "Error en consulta a base de datos " . $e->getMessage();
}

// Convertir la respuesta a JSON y enviarla al cliente
echo json_encode($respuesta);

?>
