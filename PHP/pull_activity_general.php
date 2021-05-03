<?php
// filename: myAjaxFile.php
// some PHP
require_once("db_link.php");
//return sub activities as nested assiciative arrays grouped by Sub_ID
/*$num = 2;
$query_sub = $link->query("SELECT * FROM sub_activities WHERE Main_ID = $num");
$data_sub = array();
if($query_sub->num_rows > 0){
    while($row = $query_sub->fetch_assoc()){
        $data_sub[$row["Sub_ID"]] = $row;
    }
}*/
//return main activities as assiciative arrays with corresponding sub activ
$project_id = $_POST['project_id'];

$query_main = $link->query("SELECT * FROM main_activities_".$project_id."_general");
$data_main = array();
if($query_main->num_rows > 0){
    while($row_main = $query_main->fetch_assoc()){
        $num = $row_main["Main_ID"];
        $query_sub = $link->query("SELECT * FROM sub_activities_".$project_id."_general WHERE Main_ID = $num");
        $data_sub = array();
        if($query_sub->num_rows > 0){
            while($row = $query_sub->fetch_assoc()){
                $data_sub[$row["Sub_ID"]] = $row;
            }
        }
        $row_main["sub_activity"] = $data_sub;
        $data_main[$row_main["Main_ID"]] = $row_main;
    }
}
$data = $data_main;
echo json_encode($data);
require_once("db_link_close.php")
?>