<?php
require_once("db_link.php");
$rel_id = explode(";",$_POST['rel_id']);
$project_id=$_POST['project_id'];
$data_main = array();

for ($i=0;$i<sizeof($rel_id)-1;$i++){
    $a = intval($rel_id[$i]);
    $stmt = $link->prepare("DELETE FROM relationship_".$project_id." WHERE Relationship_ID = ?");
    $stmt->bind_param("i",$a);
    $stmt->execute();
}



require_once("db_link_close.php");
?>