<?php
    $user = 'root';
    $server_name = 'localhost';
    $db_name = "ternurines";
    $password = '';

    $conn = new mysqli($server_name,$user,$password,$db_name);

    if ($conn->connect_error){
        die("Conexion fallida". $conn->connect_error);
    }