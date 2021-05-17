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
    $holidays_array = explode(',',$_POST['holidays']);
    echo json_encode($holidays_array);
    $stmt = $link->prepare("UPDATE project_database SET WorkWeek = ? , start_day = ? WHERE Project_id = ?");
    $stmt->bind_param("isi", $workweek, $start_day, $project_id);
    $stmt->execute();

    for ($h=0;$h<sizeof($holidays_array);$h++){
        $holiday_name = explode('_',$holidays_array[$h])[0];
        $holiday_date = explode('_',$holidays_array[$h])[1];
        echo json_encode($holiday_name);
        echo json_encode($holiday_date);
        echo "INSERT INTO holidays_".$project_id." (HolidayName, HolidayDate) VALUES (".$holiday_name.",".$holiday_date.")";
        if (isset(explode('_',$holidays_array[$h])[2])){
            $holiday_id = explode('%',$holidays_array[$h])[2];
            $stmt = $link->prepare("UPDATE holidays_".$project_id." SET HolidayName = ? , HolidayDate = ? WHERE Holiday_id = ?");
            $stmt->bind_param("ssi", $holiday_name, $holiday_date, $holiday_id);
            $stmt->execute();
        }
        else{
        $stmt = $link->prepare("INSERT INTO holidays_".$project_id." (HolidayName, HolidayDate) VALUES (?,?)");
        $stmt->bind_param("ss", $holiday_name, $holiday_date);
        $stmt->execute();
        }
    }

};

require_once("db_link_close.php");
?>