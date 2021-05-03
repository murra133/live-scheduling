<?php
require_once("db_link.php");

//Post Values
$project_id=$_POST['project_id'];
$stmt = $link->query("DELETE FROM main_activities_".$project_id."_general");
$stmt = $link->query("DELETE FROM sub_activities_".$project_id."_general");
$stmt = $link->query("INSERT INTO main_activities_".$project_id."_general SELECT * FROM main_activities_".$project_id);
$stmt = $link->query("INSERT INTO sub_activities_".$project_id."_general SELECT * FROM sub_activities_".$project_id);
require_once("db_link_close.php")
?>