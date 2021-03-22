<?php
require_once("db_link.php");

//Post Values
$project_id=$_POST['project_id'];
$party_id=$_POST['party_id'];
$party_name = $_POST['party_name'];

$stmt = $link->prepare("DELETE FROM parties_".$project_id." WHERE PARTY_ID = (?)");
$stmt->bind_param("i",$main_id);
$stmt->execute(); 


$stmt = $link->prepare("INSERT INTO parties_".$project_id." (PARTY_ID, PARTY_NAME) VALUES(?,?)");
$stmt->bind_param("is",$party_id,$party_name);
$stmt->execute();
require_once("db_link_close.php")
?>