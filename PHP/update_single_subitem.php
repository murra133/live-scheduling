<?php
require_once("db_link.php");

$project_id=$_POST['project_id'];
$sub_id =explode(',',$_POST['sub_id']);
$sub_item = explode(',',$_POST['sub_item']);
$action = $_POST['action'];

for($i=0;$i<sizeof($sub_id);$i++){
    if ($action=='sub_name'){
        $stmt = $link->prepare("UPDATE sub_activities_".$project_id." SET Sub_Activity = ? WHERE Sub_ID = ?");
        $stmt->bind_param("si",$sub_item[$i],$sub_id[$i]);
        $stmt->execute();
    
    }
    else if($action=='position'){
        $stmt = $link->prepare("UPDATE sub_activities_".$project_id." SET Position = ? WHERE Sub_ID = ?");
        $stmt->bind_param("ii",$sub_item[$i],$sub_id[$i]);
        $stmt->execute();
    }

}

?>