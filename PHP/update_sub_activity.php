<?php
require_once("db_link.php");

$project_id=$_POST['project_id'];
$sub_id =$_POST['sub_id'];
$date =strval($_POST['date']);
$sub_activity =$_POST['sub_activity'];
$duration = $_POST['duration'];
$party_involved =$_POST['party_involved'];
$actualized = intval($_POST['actualized']);
$stmt = $link->prepare("UPDATE sub_activities_".$project_id." SET Sub_Activity = ?, Date = ?, Duration = ?,Party_Involved= ?, Actualized=? WHERE Sub_ID = ?");
$stmt->bind_param("ssisii",$sub_activity,$date,$duration,$party_involved,$actualized,$sub_id);
$stmt->execute();
echo("Working");
require_once("db_link_close.php")
?>