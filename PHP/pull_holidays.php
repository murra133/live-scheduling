<?php
require_once("db_link.php");
$project_id = $_POST['project_id'];
$result = $link->query("SELECT * FROM holidays_".$project_id);

while ($row = $result->fetch_assoc()){
    $id = $row['Holiday_id'];
    $innerarray['HolidayName'] = $row['HolidayName'];
    $innerarray['HolidayDate'] = $row['HolidayDate'];
    $array[$id] = [$innerarray];
}
echo json_encode($array);
require_once("db_link_close.php");
?>