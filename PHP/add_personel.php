<?php
require_once("db_link.php");
$project_id=$_POST['project_id'];
$PERSON_ID = $_POST['personel_id'];
$PARTY_ID=$_POST['party_id'];
$PERSON_FNAME =$_POST['personel_fname'];
$PERSON_LNAME =$_POST['personel_lname'];
$TITLE =$_POST['personel_title'];
$EMAIL =$_POST['personel_email'];
$action=$_POST['action'];

/*$stmt = $link->prepare("DELETE FROM sub_activities WHERE Sub_ID = (?)");
$stmt->bind_param("i",$sub_id);
$stmt->execute();*/

if ($action=="Update"){
    $stmt = $link->prepare("UPDATE personel_".$project_id." SET PERSON_FNAME=?, PERSON_LNAME=?, EMAIL=?, TITLE=? WHERE PERSON_ID=?");
    $stmt->bind_param("ssssi",$PERSON_FNAME,$PERSON_LNAME,$EMAIL,$TITLE,$PERSON_ID);
    $stmt->execute();
}
else{
    $stmt = $link->prepare("INSERT INTO personel_".$project_id." (PERSON_ID, PARTY_ID, PERSON_FNAME, PERSON_LNAME, EMAIL, TITLE) VALUES(?,?,?,?,?,?)");
    $stmt->bind_param("iissss",$PERSON_ID,$PARTY_ID,$PERSON_FNAME,$PERSON_LNAME,$EMAIL,$TITLE);
    $stmt->execute();
};


require_once("db_link_close.php")
?>