<?php
require_once("db_link.php");
$EMAIL =$_GET['email'];

$stmt = $link->prepare("SELECT Register_id FROM User_Registry WHERE Email = ?");
$stmt->bind_param("s",$EMAIL);
$stmt->execute();
$result = $stmt -> get_result();
$register_id = $result -> fetch_assoc();

$num = $register_id["Register_id"];
echo($num);

$stmt = "INSERT INTO project_user_merge (".$num.", Project_id, 4)
     SELECT Project_id FROM project_unregistered_user_merge WHERE email=".$EMAIL;
$stmt->execute();

$stmt = "DELETE FROM project_unregistered_user_merge WHERE email=".$EMAIL;
$stmt->execute();

require_once("db_link_close.php")
?>