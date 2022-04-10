<?php
require_once("db_link.php");
$project_id = $_POST['project_id'];
$id = $_POST['id'];
$action = $_POST['action'];


if($action=="subid"){
    $result = $link->query("SELECT Sub_ID FROM sub_activities_".$project_id." WHERE Main_ID = ".$id);
    $id_array = [];
    $id = intval($id);
    $new_id = 0;
    $i=0;
    while ($row = $result->fetch_assoc()){
        array_push($id_array,intval($row['Sub_ID']));
    }

    while ($i<sizeof($id_array) && $new_id==0){
        $temp_id = $id*1000+$i+1;
        if($id_array[$i]!=$temp_id){
            $new_id = $temp_id;
        }
        $i=$i+1;
    }

    if($new_id==0){
        $new_id = $id*1000+$i+1;
    }

    echo json_encode($new_id);
}
else if($action=='mainid'){
    $result = $link->query("SELECT Main_ID FROM main_activities_".$project_id);
    $id_array = [];
    $new_id = 0;
    $i=0;
    while ($row = $result->fetch_assoc()){
        array_push($id_array,intval($row['Main_ID']));
    }

    while ($i<sizeof($id_array) && $new_id==0){
        $temp_id = $i+1;
        if($id_array[$i]!=$temp_id){
            $new_id = $temp_id;
        }
        $i=$i+1;
    }

    if($new_id==0){
        $new_id = $i+1;
    }

    echo json_encode($new_id);
}


require_once("db_link_close.php");
?>