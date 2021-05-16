<?php
require_once("db_link.php");
$emails = explode(',',$_POST['emails']);
$admin_levels = explode(',',$_POST['admin_levels']);
$project_id = $_POST['project_id'];

for ($k=0;$k<sizeof($emails);$k++){
    $stmt = $link->prepare("SELECT Register_id FROM User_Registry WHERE Email = ?");
    $stmt->bind_param("s",$emails[$k]);
    $stmt->execute();
    $result = $stmt -> get_result();
    $register_id = $result -> fetch_assoc();


    if($register_id!=""){
        $stmt = $link->prepare("SELECT admin_level FROM Project_User_Merge WHERE Register_id = ? and Project_id = ?");
        $stmt->bind_param("ii",$register_id['Register_id'],$project_id);
        $stmt->execute();
        $result = $stmt -> get_result();
        $admin = $result -> fetch_assoc();

    
        if(json_encode($admin) != 'null'||$admin['admin_level'] == $admin_levels[$k]){
            echo("UPDATE Project_User_Merge SET admin_level = ".$admin_levels[$k]." WHERE Register_id =".$register_id['Register_id']." and Project_id =".$project_id);
            $stmt = $link->prepare("UPDATE Project_User_Merge SET admin_level = ? WHERE Register_id = ? and Project_id = ?");
            $stmt->bind_param("iii",$admin_levels[$k],$register_id['Register_id'],$project_id);
            $stmt->execute();

        }
        else{
            $stmt = $link->prepare("INSERT INTO Project_User_Merge (admin_level, Register_id, Project_id) VALUES (?,?,?) ");
            $stmt->bind_param("iii",$admin_levels[$k],$register_id['Register_id'],$project_id);
            $stmt->execute();
        }

    }
    
}
require_once("db_link_close.php")
?>