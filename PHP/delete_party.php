<?php
require_once('db_link.php');
$project_id=$_POST['project_id'];
$id = $_POST['id'];

    $stmt = $link->prepare("DELETE FROM parties_".$project_id." WHERE PARTY_ID = ?");
    $stmt->bind_param("i",$id);
    $stmt->execute();



require_once('db_link_close.php')
?>