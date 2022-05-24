<?php
require_once('db_link.php');
$project_id=intval($_POST['project_id']);

//$stmt = $link->prepare("DELETE FROM project_database WHERE Project_id = ?");
//$stmt->bind_param("i",$project_id);
//$stmt->execute();

$stmt = ("DELETE FROM project_database WHERE Project_id = ".$project_id.";");

$stmt .=("DROP TABLE relationship_".$project_id.";
        DROP TABLE sub_activities_".$project_id.";
        DROP TABLE sub_activities_".$project_id."_general;
        DROP TABLE personel_".$project_id.";
        DROP TABLE parties_".$project_id.";
        DROP TABLE main_activities_".$project_id.";
        DROP TABLE main_activities_".$project_id."_general;
        DROP TABLE holidays_".$project_id.";");


        $result = $link -> multi_query($stmt);
 



require_once('db_link_close.php');

?>