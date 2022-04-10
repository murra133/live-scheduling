<?php
require_once('db_link.php');
$project_id=$_POST['project_id'];
$PARTY_ID=$_POST['party_id'];
$PERSON_ID = $_POST['personel_id'];

    $stmt = $link->prepare("DELETE FROM personel_".$project_id." WHERE PERSON_ID = ?");
    $stmt->bind_param("i",$PERSON_ID);
    $stmt->execute();



require_once('db_link_close.php')
?>