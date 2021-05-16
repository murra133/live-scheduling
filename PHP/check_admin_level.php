<?php
require_once("db_link.php");

    $project_id = $_POST['project_id'];
    $register_id = $_POST['register_id'];

    if(isset($register_id)){
        $stmt = $link->prepare("SELECT admin_level FROM project_user_merge WHERE Register_id = ? AND Project_id = ?");
        $stmt->bind_param("ii",$register_id, $project_id);
        $stmt->execute();
        $result = $stmt -> get_result();
        $data = $result -> fetch_assoc();
    
    
    
    echo json_encode($data);
    }
    else{
        $stmt = $link->prepare("SELECT admin_level, Register_id FROM project_user_merge WHERE Project_id = ?");
        $stmt->bind_param("i",$project_id);
        $stmt->execute();
        $result = $stmt -> get_result();
        $array =Array();
        $k=0;
        while($data = $result -> fetch_assoc()){
            $array[$k] = $data;
            $k++;
        }
        echo json_encode($array);

    
    
    }




require_once("db_link_close.php")
?>