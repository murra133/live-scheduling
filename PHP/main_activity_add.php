<?php
require_once("db_link.php");

//Post Values
$main_id=$_POST['main_id'];
$main_activity = $_POST['main_activity'];

$stmt = $link->prepare("DELETE FROM main_activities WHERE Main_ID = (?)");
$stmt->bind_param("i",$main_id);
$stmt->execute(); 


$stmt = $link->prepare("INSERT INTO main_activities (Main_ID, Main_Activity) VALUES(?,?)");
$stmt->bind_param("is",$main_id,$main_activity);
$stmt->execute();
require_once("db_link_close.php")
?>