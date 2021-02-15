<?php
$user = 'root';
$password = '';
$db = 'test_schedule';
$host = 'localhost';
$port = 3306;
$link = mysqli_init();
$conn = $link -> real_connect($host, $user, $password, $db, $port);
<<<<<<< HEAD
if ($conn === 1){
=======
if ($conn == 1){
    echo($conn);
>>>>>>> d9ed746e5e97d820e13f2f9bd6aa77a6497e2a03
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