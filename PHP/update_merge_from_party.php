<?php
// filename: myAjaxFile.php
// some PHP
require_once("db_link.php");
$Register_id = $_POST['Register_id'];
$Project_id = $_POST['Project_id'];

$query_main = $link->query("SELECT DISTINCT Register_id FROM project_user_merge");
$data = array();
while($row = $query_main->fetch_assoc()){
    $num = $row["Register_id"];
    $sub_data = array();
    $query_sub = $link->query("SELECT * FROM project_user_merge WHERE Register_id = $num");
    while($row_sub = $query_sub->fetch_assoc()){
        $sub_data[$row_sub["Project_id"]] = $row_sub["admin_level"];
    }
    $data[$row["Register_id"]] = $sub_data;
}
$admin_level = 4;
if(array_key_exists($Register_id, $data)){
    if(array_key_exists($Project_id, $data[$Register_id])){
        echo("yes");
    }
    else{
        $stmt = $link->prepare("INSERT INTO project_user_merge (Register_id, Project_id, admin_level) VALUES(?,?,?)");
        $stmt->bind_param("iii",$Register_id,$Project_id,$admin_level);
        $stmt->execute();

        echo("Running");
    }
}
else{
    $stmt = $link->prepare("INSERT INTO project_user_merge (Register_id, Project_id, admin_level) VALUES(?,?,?)");
    $stmt->bind_param("iii",$Register_id,$Project_id,$admin_level);
    $stmt->execute();
    echo("Running1");
}
require_once("db_link_close.php")
?>