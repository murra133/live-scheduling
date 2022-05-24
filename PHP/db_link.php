<?php
// error_reporting(0);
// $user = 'test1';
// $password = 'databasetest';
// $db = 'ebdb';
// $host = 'aa1cdwix3a6qcz2.cjqmvdmnoqcw.us-west-1.rds.amazonaws.com';

$user = 'root';
$password = '';
$db = 'test_schedule';
$host = 'localhost';
$port = 3306;
// $conn = new mysqli($host,$user,$password,$db,$port);
$link = mysqli_init();
$conn = $link -> real_connect($host, $user, $password, $db, $port);
if ($conn != 1){
    $password = 'root';
$port = 3307;
$conn = $link -> real_connect($host, $user, $password, $db, $port);
if ($result = $link -> query("SELECT * FROM ages")) {
    echo "Returned rows are: " . $result -> num_rows;
    // Free result set
    $result -> free_result();
  }
}

?>