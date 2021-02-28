<?php
require_once("db_link.php");

$PERSON_ID = $_POST['personel_id'];
$PARTY_ID=$_POST['party_id'];
$PERSON_FNAME =$_POST['personel_fname'];
$PERSON_LNAME =$_POST['personel_lname'];
$TITLE =$_POST['personel_title'];
$EMAIL =$_POST['personel_email'];

/*$stmt = $link->prepare("DELETE FROM sub_activities WHERE Sub_ID = (?)");
$stmt->bind_param("i",$sub_id);
$stmt->execute();*/


$stmt = $link->prepare("INSERT INTO personel (PERSON_ID, PARTY_ID, PERSON_FNAME, PERSON_LNAME, EMAIL, TITLE) VALUES(?,?,?,?,?,?)");
$stmt->bind_param("iissss",$PERSON_ID,$PARTY_ID,$PERSON_FNAME,$PERSON_LNAME,$EMAIL,$TITLE);
$stmt->execute();

require_once("db_link_close.php")
?>