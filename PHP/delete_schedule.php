<?php
require_once('db_link.php');
$project_id=intval($_GET['project_id']);

//$stmt = $link->prepare("DELETE FROM project_database WHERE Project_id = ?");
//$stmt->bind_param("i",$project_id);
//$stmt->execute();

$stmt = ("DELETE FROM project_database WHERE Project_id = ".$project_id.";");

$stmt .=("DROP TABLE sub_activities_".$project_id.";
        DROP TABLE main_activities_".$project_id.";
        DROP TABLE personel_".$project_id.";
        DROP TABLE parties_".$project_id.";");

        echo $stmt;
        $result = $link -> multi_query($stmt);
        echo $result;



require_once('db_link_close.php');

?>