<?php
require_once("db_link.php");

//Post Values
$project_id=$_POST['project_id'];
$action = $_POST['action'];

if ($action == 'project_information'){
    $p_name = $_POST['name'];
    $p_desc = $_POST['desc'];
    $p_sdate = $_POST['sdate'];
    $p_edate = $_POST['edate'];
    $p_address = $_POST['address'];
    $stmt = $link->prepare("UPDATE project_database SET ProjectName = ?, ProjectDescription = ?, ProjectStart = ?, ProjectEnd = ?, ProjectAddress = ? WHERE Project_id = ?");
    $stmt->bind_param("sssssi",$p_name, $p_desc, $p_sdate, $p_edate, $p_address, $project_id);
    $stmt->execute();
}
elseif ($action == 'project_settings'){
    $workweek = $_POST['workweek'];
    $start_day = $_POST['start_day'];
    $holidays = $_POST['holidays'];
    $stmt = $link->prepare("UPDATE project_database SET WorkWeek = ? , start_day = ? WHERE Project_id = ?");
    $stmt->bind_param("isi", $workweek, $holidays, $project_id);
    $stmt->execute();
    $stmt = $link->prepare("UPDATE holidays_".$project_id." SET Holiday_Name = ? , start_day = ? WHERE Project_id = ?");
    $stmt->bind_param("isi", $workweek, $holidays, $project_id);
    $stmt->execute();
};

require_once("db_link_close.php");
?>