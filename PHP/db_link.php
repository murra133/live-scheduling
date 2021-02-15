<?php
ini_set('display_errors', '0');
$user = 'root';
$password = '';
$db = 'test_schedule';
$host = 'localhost';
$port = 3306;
$link = mysqli_init();
$conn = $link -> real_connect($host, $user, $password, $db, $port);
if ($conn === 1){
    echo($conn);
    if ($result = $link -> query("SELECT * FROM ages")) {
        echo "Returned rows are: " . $result -> num_rows;
        // Free result set
        $result -> free_result();
      }
}
else{
    $password = 'root';
<<<<<<< HEAD:db_link.php
    $port = 3307;
    $db = 'coursera';
    $conn = $link -> real_connect($host, $user, $password, $db, $port);
    echo($conn);
    if ($result = $link -> query("SELECT * FROM ages")) {
        echo "Returned rows are: " . $result -> num_rows;
        // Free result set
        $result -> free_result();
    }
    $link -> close();
=======
$port = 3307;
$conn = $link -> real_connect($host, $user, $password, $db, $port);
echo($conn);
if ($result = $link -> query("SELECT * FROM ages")) {
    echo "Returned rows are: " . $result -> num_rows;
    // Free result set
    $result -> free_result();
  }
>>>>>>> f703448c033c339845296a3c5004327cfcc5f351:PHP/db_link.php
}

?>