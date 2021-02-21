<?php
error_reporting(0);
$user = 'root';
$password = '';
$db = 'test_schedule';
$host = 'localhost';
$port = 3306;
$link = mysqli_init();
$conn = $link -> real_connect($host, $user, $password, $db, $port);
if ($conn == 1){
<<<<<<< HEAD
=======
    echo($conn);
>>>>>>> ef94711c87fff54641650ad99d34306850bf3ec7
    if ($result = $link -> query("SELECT * FROM ages")) {
        echo "Returned rows are: " . $result -> num_rows;
        // Free result set
        $result -> free_result();
      }
}
else{
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