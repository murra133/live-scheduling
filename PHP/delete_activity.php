<?php
require_once('db_link.php');

$id = $_POST['id'];
$action = $_POST['action'];
$project_id = $_POST['project_id'];

if($action == 'delete_sub_activity'){
    $stmt = $link->prepare("DELETE FROM sub_activities_".$project_id." WHERE Sub_ID = ?");
    $stmt->bind_param("i",$id);
    $stmt->execute();
}

elseif($action == 'delete_main_activity'){
    $stmt = $link->prepare("DELETE FROM main_activities_".$project_id." WHERE Main_ID = ?");
    $stmt->bind_param("i",$id);
    $stmt->execute();
}
require_once('db_link_close.php')
?>