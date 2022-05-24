<?php
require_once("db_link.php");
$PERSON_FNAME =$_POST['personel_fname'];
$PERSON_LNAME =$_POST['personel_lname'];
$TITLE =$_POST['personel_title'];
$EMAIL =$_POST['personel_email'];
$COMPANY =$_POST['personel_company'];
$project_id =$_POST['project_id'];
$action=$_POST['action'];

/*$stmt = $link->prepare("DELETE FROM sub_activities WHERE Sub_ID = (?)");
$stmt->bind_param("i",$sub_id);
$stmt->execute();*/
$stmt = $link->prepare("Select personel_id From unregistered_personel Where Email = ?");
$stmt->bind_param("s",$EMAIL);
$stmt->execute();
$result = $stmt->get_result();
$val = $result->fetch_assoc();
echo(json_encode($val));

//personel table
if($val==NULL){
    $stmt = $link->prepare("INSERT INTO unregistered_personel (FirstName, LastName, EMAIL, Company, TITLE) VALUES(?,?,?,?,?)");
    $stmt->bind_param("sssss",$PERSON_FNAME,$PERSON_LNAME,$EMAIL,$COMPANY,$TITLE);
    $stmt->execute();
}


$stmt = $link->prepare("Select personel_id From unregistered_personel Where Email = ?");
$stmt->bind_param("s",$EMAIL);
$stmt->execute();
$result = $stmt->get_result();
$val = $result->fetch_assoc();
echo(json_encode($val));
//Merge table
if ($ACTION=="Update"){
}
else{
    $stmt = $link->prepare("INSERT INTO project_unregistered_user_merge (PERSONEL_ID, EMAIL, PROJECT_ID) VALUES (?,?,?)");
    $stmt->bind_param("isi",$val['personel_id'],$EMAIL,$project_id);
    $stmt->execute();
    echo("workssss");
}

require_once("db_link_close.php")
?>