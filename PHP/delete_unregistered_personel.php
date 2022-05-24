<?php
require_once('db_link.php');
$email = $_POST['email'];

    $stmt = $link->prepare("DELETE FROM unregistered_personel WHERE EMAIL = ?");
    $stmt->bind_param("s",$email);
    $stmt->execute();



require_once('db_link_close.php')
?>