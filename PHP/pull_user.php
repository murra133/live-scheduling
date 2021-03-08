<?php
require_once("db_link.php");
if (isset($_GET['username']) && isset($_GET['password'])){
    $username = $_GET['username'];
    $password = $_GET['password'];
    
    
        $stmt = $link->prepare("SELECT Register_id FROM user_registry WHERE (Username,Password) = (?,?)");
        $stmt->bind_param("ss",$username,$password);
        $stmt->execute();
        $result = $stmt -> get_result();
        $data = $result -> fetch_assoc();
    
    echo json_encode($data);
}

elseif(isset($_GET['register_id'])){
    $id = $_GET['register_id'];
    $stmt = $link->prepare("SELECT FirstName, LastName, Email, Company, Title, Username FROM user_registry WHERE Register_id = ?");
    $stmt->bind_param("i",$id);
    $stmt->execute();
    $result = $stmt -> get_result();
    $data = $result -> fetch_assoc();
    echo json_encode($data);

}

require_once("db_link_close.php")
?>