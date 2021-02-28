<?php
require_once("db_link.php");

//Post Values
$firstName=$_POST['firstName'];
$lastName = $_POST['lastName'];
$username = $_POST['username'];
$company = $_POST['company'];
$title = $_POST['title'];
$email = $_POST['email'];
$password = $_POST['password'];

    $stmt = $link->prepare("INSERT INTO user_registry(FirstName, LastName, Email, Company, Title, Username, Password) VALUES (?,?,?,?,?,?,?)");
    $stmt->bind_param("sssssss",$firstName,$lastName,$email,$company,$title,$username,$password);
    $stmt->execute();

require_once("db_link_close.php")
?>