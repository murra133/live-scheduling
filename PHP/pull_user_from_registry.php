<?php
require_once("db_link.php");

$register_id = $_POST['register_id'];
$project_id = $_POST['project_id'];
$stmt = $link->prepare("SELECT FirstName, LastName, Email, Company, Title FROM user_registry WHERE Register_id = ?");
$stmt->bind_param("i",$register_id);
$stmt->execute();
$result = $stmt -> get_result();
$data = $result -> fetch_assoc();

$stmt = $link->prepare("SELECT admin_level FROM project_user_merge WHERE Register_id = ? AND Project_id = ?");
$stmt->bind_param("ii",$register_id, $project_id);
$stmt->execute();
$result = $stmt -> get_result();
$data2 = $result -> fetch_assoc();

$data['admin_level']=$data2['admin_level'];

echo json_encode($data);
require_once("db_link_close.php")
?>