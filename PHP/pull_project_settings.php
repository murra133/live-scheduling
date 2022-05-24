<?php
require_once("db_link.php");

//Post Values
$project_id=$_POST['project_id'];

$stmt = $link->prepare("SELECT ProjectName, ProjectDescription, ProjectStart, ProjectEnd, ProjectAddress, WorkWeek, Start_Day, LookAhead FROM project_database WHERE Project_id = ?");
$stmt->bind_param("i",$project_id);
$stmt->execute();
$result = $stmt -> get_result();
$data = $result ->fetch_assoc();
echo json_encode($data);

require_once("db_link_close.php")
?>