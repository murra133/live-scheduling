<?php
require_once("db_link.php");

$project_id=$_POST['project_id'];
$main_id =explode(',',$_POST['main_id']);
$main_item = explode(',',$_POST['main_item']);
$action = $_POST['action'];

for($i=0;$i<sizeof($main_id);$i++){
    if ($action=='main_name'){
        $stmt = $link->prepare("UPDATE sub_activities_".$project_id." SET Sub_Activity = ? WHERE Sub_ID = ?");
        $stmt->bind_param("si",$sub_item[$i],$sub_id[$i]);
        $stmt->execute();
    
    }
    else if($action=='position'){
        $stmt = $link->prepare("UPDATE main_activities_".$project_id." SET Position = ? WHERE Main_ID = ?");
        $stmt->bind_param("ii",$main_item[$i],$main_id[$i]);
        $stmt->execute();
    }

}

?>