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
//return main activities as assiciative arrays with corresponding sub activity nested inside
$project_id = $_POST['project_id'];
$query_main = $link->query("SELECT * FROM parties_".$project_id);
$data_main = array();
if($query_main->num_rows > 0){
    while($row_main = $query_main->fetch_assoc()){
        $num = $row_main["PARTY_ID"];
        $query_sub = $link->query("SELECT * FROM personel_".$project_id." WHERE PARTY_ID = $num");
        $data_sub = array();
        if($query_sub->num_rows > 0){
            while($row = $query_sub->fetch_assoc()){
                $data_sub[$row["PERSON_ID"]] = $row;
            }
        }
        $row_main["PERSON_NAME"] = $data_sub;
        $data_main[$row_main["PARTY_ID"]] = $row_main;
    }
}
$data = $data_main;
echo json_encode($data);
require_once("db_link_close.php")
?>