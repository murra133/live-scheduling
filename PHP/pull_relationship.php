<?php
require_once("db_link.php");

$project_id = $_POST['project_id'];
$query_main = $link->query("SELECT * FROM relationship_".$project_id);
$data_main = array();
if($query_main->num_rows > 0){
    while($row_main = $query_main->fetch_assoc()){
        $p_id = $row_main["Parent_ID"];
        $c_id = $row_main["Child_ID"];
        $r_id = $row_main["Relationship_ID"];
        $rel = $row_main["Relationship"];
        $lag = $row_main["LAG_"];
        $data_main[$c_id][0][$r_id]= ['sub_id'=>$p_id,'Rel'=>$rel,'Lag'=>$lag];
        $data_main[$p_id][1][$r_id]= ['sub_id'=>$c_id,'Rel'=>$rel,'Lag'=>$lag];      
    }
}

echo json_encode($data_main);
require_once("db_link_close.php")
?>