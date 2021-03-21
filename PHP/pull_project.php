<?php
require_once("db_link.php");

    $id = $_POST['register_id'];
    $stmt = $link->prepare("SELECT Project_id FROM project_user_merge WHERE Register_id = ?");
    $stmt->bind_param("i",$id);
    $stmt->execute();
    $result = $stmt -> get_result();
    $project_id = Array();
    $project_name = Array();
    $admin_name = Array();
    $n=0;
    while($data = $result -> fetch_assoc()){
    $project_id[$n] = $data['Project_id'];
    $n++;
    };
///// Gets the Project Name
    for($k=0;$k<sizeof($project_id);$k++){
        $id = $project_id[$k];
        $stmt = $link->query("SELECT ProjectName FROM project_database WHERE Project_id =".$id);
        $data = $stmt -> fetch_assoc();
        $project_name[$k] = $data["ProjectName"];
//// Gets the Administrator Name

        $stmt = $link->query("SELECT Register_id FROM project_user_merge WHERE (Project_id,admin_level) =(".$id.",1)");
        $data = $stmt -> fetch_assoc();
        $admin_id = $data["Register_id"];

        $stmt = $link->query("SELECT FirstName,LastName FROM user_registry WHERE Register_id =".$admin_id);
        $data = $stmt -> fetch_assoc();
        $admin_name[$k] = $data["FirstName"]." ".$data["LastName"];
    };
//// Creates Dictionary with all the information
    for($i=0;$i<sizeof($project_id);$i++){
        $result_array[$project_id[$i]]=[$admin_name[$i],$project_name[$i]];
    };

    echo json_encode($result_array);
    



require_once("db_link_close.php")
?>