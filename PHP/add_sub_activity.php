<?php
require_once("db_link.php");

$project_id=$_POST['project_id'];
$sub_id = $_POST['sub_id'];
$main_id=$_POST['main_id'];
$sub_activity =$_POST['sub_activity'];
$date =$_POST['date'];
$duration =$_POST['duration'];
$party_involved = $_POST['party_involved'];

/*$stmt = $link->prepare("DELETE FROM sub_activities WHERE Sub_ID = (?)");
$stmt->bind_param("i",$sub_id);
$stmt->execute();*/


$stmt = $link->prepare("INSERT INTO sub_activities_".$project_id." (Sub_ID, Main_ID, Sub_Activity,Date, Duration,Party_Involved) VALUES(?,?,?,?,?,?)");
$stmt->bind_param("iissis",$sub_id,$main_id,$sub_activity,$date,$duration,$party_involved);
$stmt->execute();


echo("INSERT INTO sub_activities_".$project_id." (Sub_ID, Main_ID, Sub_Activity,Date, Duration,Party_Involved) VALUES(".$sub_id.",".$main_id.",".$sub_activity.",".$date.",".$duration.",".$party_involved.")");

require_once("db_link_close.php")
?>