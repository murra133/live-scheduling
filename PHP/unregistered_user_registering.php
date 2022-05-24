<?php
require_once("db_link.php");

//Post Values
// $firstName=$_POST['firstName'];
// $lastName = $_POST['lastName'];
// $username = $_POST['username'];
// $company = $_POST['company'];
// $title = $_POST['title'];
$email = $_POST['email'];
// $password = $_POST['password'];


/*Check Unregistered User Personnel*/

$stmt = $link->prepare("Select personel_id From unregistered_personel Where Email = ?");
$stmt->bind_param("s",$EMAIL);
$stmt->execute();
$result = $stmt->get_result();
$val = $result->fetch_assoc();
echo(json_encode($val));

//personel tablel
if($val!=NULL){
    $stmt = $link->prepare("DELETE FROM unregistered_personel WHERE personel_id =".$val);
    $stmt->execute();
}


require_once("db_link_close.php")
?>