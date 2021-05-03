<?php
// filename: myAjaxFile.php
// some PHP
require_once("db_link.php");
$query_main = $link->query("SELECT * FROM user_registry");
$data = array();
while($row = $query_main->fetch_assoc()){
    $data[$row["Email"]] = $row["Register_id"];
}
echo json_encode($data);
require_once("db_link_close.php")
?>