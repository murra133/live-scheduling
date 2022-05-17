<?php
// error_reporting(0);
// $user = 'root';
$user = 'gnatt123';
$password = 'gnattschedule2022';
//$password = '';
// $db = 'test_schedule';
$db = 'ebdb';
// $host = 'localhost';
$host = 'aaucggsja2cwtw.cjqmvdmnoqcw.us-west-1.rds.amazonaws.com';
$port = 3306;
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