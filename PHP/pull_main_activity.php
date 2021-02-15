<?php
// filename: myAjaxFile.php
// some PHP
require_once("db_link.php");
$query = $link->query("SELECT * FROM main_activities");
if($query->num_rows > 0){
    $data = $query->fetch_all();
}
echo json_encode($data);
require_once("db_link_close.php")
?>