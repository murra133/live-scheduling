<?php
require_once("db_link.php");
$rel_id = explode(";",$_POST['rel_id']);
$project_id=$_POST['project_id'];
$relationship = explode(";",$_POST['relationship']);
$parent_id = explode(";",$_POST['parent_id']);
$child_id = explode(";",$_POST['child_id']);
$lag = explode(";",$_POST['lag']);
$data_main = array();

for ($i=0;$i<sizeof($rel_id)-1;$i++){
    $a = intval($rel_id[$i]);
    $b = intval($relationship[$i]);
    $c = intval($parent_id[$i]);
    $d = intval($child_id[$i]);
    $e = intval($lag[$i]);

    if ($a==0){
        $stmt = $link->prepare("INSERT INTO relationship_".$project_id." (Parent_ID, Child_ID, Relationship, LAG_) VALUES(?,?,?,?)");
        $stmt->bind_param("iisi",$c,$d,$b,$e);
        $stmt->execute();
    }
    else{
        $stmt = $link->prepare("UPDATE relationship_".$project_id." SET Parent_ID = ?, Child_ID = ?, Relationship = ?, LAG_ = ? WHERE Relationship_ID = ? ");
        $stmt->bind_param("iisii",$c,$d,$b,$e,$a);
        $stmt->execute();
    }
}
require_once("db_link_close.php");
?>