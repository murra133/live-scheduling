<?php
require_once("db_link.php");

$test =$_GET['test'];



$stmt = $link->query("CREATE TABLE ".$test." (
    Project_id int NOT NULL AUTO_INCREMENT,
    ProjectName varchar(255) NOT NULL,
    PRIMARY KEY (Project_id))
");

require_once("db_link_close.php")
?>