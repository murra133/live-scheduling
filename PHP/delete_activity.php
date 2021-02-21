<?php
require_once('db_link.php');

$id = 1001;///$_POST['id'];
$action = 'delete_sub_activity';//$_POST['action'];

if($action == 'delete_sub_activity'){
    $table = "sub_activities";
    $id_title = "Sub_ID";
    echo("running");
}
echo ($id);
echo ($table);
echo ($id_title);
$stmt = $link->prepare("DELETE FROM (?) WHERE (?) = (?)");

$stmt->bind_param("ssi",$table,$id_title,$id);
$stmt->execute();
echo ($stmt);
require_once('db_link_close.php')
?>