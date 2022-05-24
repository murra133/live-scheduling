<?php
require_once("db_link.php");
$project_id=$_POST['project_id'];
$PERSON_ID = $_POST['personel_id'];
$PARTY_ID=$_POST['party_id'];
$PERSON_FNAME =$_POST['personel_fname'];
$PERSON_LNAME =$_POST['personel_lname'];
$TITLE =$_POST['personel_title'];
$EMAIL =$_POST['personel_email'];
$PHONE =$_POST['personel_phone'];
$NOTIFY =$_POST['personel_notify'];
$ACTION=$_POST['action'];

/*$stmt = $link->prepare("DELETE FROM sub_activities WHERE Sub_ID = (?)");
$stmt->bind_param("i",$sub_id);
$stmt->execute();*/

echo($ACTION);

if ($ACTION=="Update"){
    $stmt = $link->prepare("UPDATE personel_".$project_id." SET PERSON_FNAME=?, PERSON_LNAME=?, EMAIL=?, TITLE=?, PHONE=?, NOTIFY=? WHERE PERSON_ID=?");
    $stmt->bind_param("sssssii",$PERSON_FNAME,$PERSON_LNAME,$EMAIL,$TITLE,$PHONE,$NOTIFY,$PERSON_ID);
    $stmt->execute();
}
else{
    $stmt = $link->prepare("INSERT INTO personel_".$project_id." (PERSON_ID, PARTY_ID, PERSON_FNAME, PERSON_LNAME, TITLE, EMAIL, PHONE, NOTIFY) VALUES (?,?,?,?,?,?,?,?)");
    $stmt->bind_param("iisssssi",$PERSON_ID,$PARTY_ID,$PERSON_FNAME,$PERSON_LNAME,$TITLE,$EMAIL,$PHONE,$NOTIFY);
    $stmt->execute();
    echo("workssss");
}


require_once("db_link_close.php")
?>