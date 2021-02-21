<?php
require_once("db_link.php");

$sub_id =$_POST['sub_id'];
$sub_activity =$_POST['sub_activity'];
$start_date =$_POST['start_date'];
$end_date =$_POST['end_date'];
$duration = $_POST['duration'];
$party_involved =$_POST['party_involved'];


$stmt = $link->prepare("UPDATE sub_activities SET Sub_Activity = ?, Start_Date = ?, End_Date = ?, Duration = ?,Party_Involved= ? WHERE SUB_ID = ?");
$stmt->bind_param("sssisi",$sub_activity,$start_date,$end_date,$duration,$party_involved,$sub_id);
$stmt->execute();

require_once("db_link_close.php")
?>