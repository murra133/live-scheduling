<?php
require_once("db_link.php");

$project_id = $_POST['project_id'];
$action = $_POST['action'];



if($action == "child"){
$query_main = $link->query("SELECT * FROM relationship_".$project_id);
$data_main = array();
if($query_main->num_rows > 0){
    while($row_main = $query_main->fetch_assoc()){
        $num = $row_main["Child_ID"];
        $query_sub = $link->query("SELECT * FROM relationship_".$project_id." WHERE Child_ID = $num");
        $data_sub = array();
        if($query_sub->num_rows > 0){
            while($row = $query_sub->fetch_assoc()){
                $data_sub[$row["Parent_ID"]] = $row;
            }
        }
        $data_main[$num] = $data_sub;
    }
}
$data = $data_main;
echo json_encode($data);
}

elseif($action =='parent'){
    $query_main = $link->query("SELECT * FROM relationship_".$project_id);
    $data_main = array();
    if($query_main->num_rows > 0){
        while($row_main = $query_main->fetch_assoc()){
            $num = $row_main["Parent_ID"];
            $query_sub = $link->query("SELECT * FROM relationship_".$project_id." WHERE Parent_ID = $num");
            $data_sub = array();
            if($query_sub->num_rows > 0){
                while($row = $query_sub->fetch_assoc()){
                    $data_sub[$row["Child_ID"]] = $row;
                }
            }
            $data_main[$num] = $data_sub;
        }
    }
    $data = $data_main;
    echo json_encode($data); 
}
require_once("db_link_close.php")
?>