<?php
require_once("db_link.php");
$username = $_GET['username'];
$password =$_GET['password'];

    $stmt = $link->prepare("SELECT Register_id FROM user_registry WHERE (Username,Password) = (?,?)");
    $stmt->bind_param("ss",$username,$password);
    $stmt->execute();
    $result = $stmt -> get_result();
    $data = $result -> fetch_assoc();

echo json_encode($data);
require_once("db_link_close.php")
?>