<?php
require_once("db_link.php");

$project_id=$_POST['project_id'];
$sub_id =$_POST['sub_id'];
$date =strval($_POST['date']);

if(isset($_POST['sub_activity'])){
    $sub_activity =$_POST['sub_activity'];
    $duration = $_POST['duration'];
    $party_involved =$_POST['party_involved'];
    $stmt = $link->prepare("UPDATE sub_activities_".$project_id." SET Sub_Activity = ?, Date = ?, Duration = ?,Party_Involved= ? WHERE SUB_ID = ?");
    $stmt->bind_param("ssisi",$sub_activity,$date,$duration,$party_involved,$sub_id);
    $stmt->execute();
}

else {
    $stmt = $link->prepare("UPDATE sub_activities_".$project_id." Date = ? WHERE SUB_ID = ?");
    $stmt->bind_param("si",$date,$sub_id);
    $stmt->execute();
};





require_once("db_link_close.php")
?>