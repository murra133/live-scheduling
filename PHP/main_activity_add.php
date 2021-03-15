<?php
require_once("db_link.php");

//Post Values
$project_id=$_POST['project_id'];
$main_id=$_POST['main_id'];
$main_activity = $_POST['main_activity'];
$action = $_POST['action'];

if ($action == 'add_main_activity'){
    $stmt = $link->prepare("INSERT INTO main_activities_".$project_id." (Main_ID, Main_Activity) VALUES(?,?)");
    $stmt->bind_param("is",$main_id,$main_activity);
    $stmt->execute();
}

elseif ($action == 'update_main_activity'){
    $stmt = $link->prepare("UPDATE main_activities_".$project_id." SET Main_Activity = (?) WHERE Main_ID = (?)");
    $stmt->bind_param("si",$main_activity,$main_id);
    $stmt->execute(); 
}





require_once("db_link_close.php")
?>