<?php
require_once("db_link.php");
$project_id=$_POST['project_id'];
$relationship = $_POST['relationship'];
$parent_id = $_POST['parent_id'];
$child_id = $_POST['child_id'];
$lag = $_POST['lag'];

$stmt = $link->prepare("INSERT INTO relationship_".$project_id." (Parent_ID, Child_ID, Relationship, Lag) VALUES(?,?,?,?)");
$stmt->bind_param("iisi",$parent_id,$child_id,$relationship,$lag);
$stmt->execute();

require_once("db_link_close.php");
?>