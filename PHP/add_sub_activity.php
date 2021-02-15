<?php
require_once("db_link.php");

$sub_id = $_POST['sub_id'];
$main_id=$_POST['main_id'];
$sub_activity = $_POST['sub_activity'];
$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'];
$duration = $_POST['duration'];
$party_involved = $_POST['party_involved'];

$stmt = $link->prepare("DELETE FROM sub_activities WHERE Sub_ID = (?)");
$stmt->bind_param("i",$sub_id);
$stmt->execute(); 


$stmt = $link->prepare("INSERT INTO sub_activities (Sub_ID, Main_ID, Sub_Activity, Start_Date, End_Date, Duration,Party_Involved) VALUES(?,?,?,?,?,?,?)");
$stmt->bind_param("iisssis",$sub_id,$main_id,$sub_activity,$start_date,$end_date,$duration,$party_involved);
$stmt->execute();

require_once("db_link_close.php")
?>