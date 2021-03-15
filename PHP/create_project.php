<?php
require_once("db_link.php");

$project_name =$_POST['project_name'];
$first_name_array = explode(',',$_POST['first_name']);
$last_name_array =explode(',',$_POST['last_name']);
$email_array = explode(',',$_POST['email']);
$admin_level_array= explode(',',$_POST['admin_level']);

$stmt = $link->prepare("INSERT INTO project_database (ProjectName) VALUE (?)");
$stmt->bind_param("s",$project_name);
$stmt->execute();
sleep(3);
$stmt = $link->prepare("SELECT Project_id FROM project_database WHERE ProjectName = ?");
$stmt->bind_param("s",$project_name);
$stmt->execute();
$result = $stmt -> get_result();
$project_id = $result -> fetch_assoc();
//echo $project_id['Project_id'];

for($i =0; $i<sizeof($email_array); $i++){
    $email = $email_array[$i];
    $first_name = $first_name_array[$i];
    $last_name = $last_name_array[$i];
    $admin_level = intval($admin_level_array[$i]);


    $stmt = $link->prepare("SELECT Register_id FROM user_registry WHERE Email = ?");
    $stmt->bind_param("s",$email);
    $stmt->execute();
    $result = $stmt -> get_result();
    $register_id = $result -> fetch_assoc();
    

    if(isset($register_id['Register_id'])){
        $stmt = $link->prepare("INSERT INTO project_user_merge (Register_id,Project_id,admin_level) VALUES (?,?,?)");
        $stmt->bind_param("iii",$register_id['Register_id'],$project_id['Project_id'],$admin_level);
        $stmt->execute();
    };
    unset($register_id);
};

$stmt = ("CREATE TABLE Main_Activities_".$project_id['Project_id']."(
                Main_ID int NOT NULL,
                Main_Activity varchar(255) NOT NULL,
                PRIMARY KEY (Main_ID))");
                mysqli_query($link,$stmt);

 $stmt = ("CREATE TABLE Sub_Activities_".$project_id['Project_id']." (
                Sub_ID int NOT NULL,
                Main_ID int NOT NULL,
                Sub_Activity varchar(255) NOT NULL,
                Start_Date varchar(255) Not NULL,
                End_Date varchar(255) Not NULL,
                Duration int NOT NULL,
                Party_Involved varchar(255) Not NULL,
                PRIMARY KEY (Sub_ID),
                FOREIGN KEY (Main_ID) REFERENCES Main_Activities_".$project_id['Project_id']."(Main_ID)
                ON UPDATE CASCADE ON DELETE CASCADE)");
                mysqli_query($link,$stmt);

$stmt = ("CREATE TABLE Parties_".$project_id['Project_id']." (
                PARTY_ID int NOT NULL,
                PARTY_NAME varchar(255) NOT NULL,
                PRIMARY KEY (PARTY_ID))");
                mysqli_query($link,$stmt);

$stmt = ("CREATE TABLE Personel_".$project_id['Project_id']." (
                PERSON_ID int NOT NULL,
                PARTY_ID int NOT NULL,
                PERSON_FNAME varchar(255) NOT NULL,
                PERSON_LNAME varchar(255) Not NULL,
                TITLE varchar(255) Not NULL,
                EMAIL varchar(255) Not NULL,
                PRIMARY KEY (PERSON_ID),
                FOREIGN KEY (PARTY_ID) REFERENCES Parties_".$project_id['Project_id']."(PARTY_ID)
                ON UPDATE CASCADE ON DELETE CASCADE)");
                mysqli_query($link,$stmt);


echo $project_id['Project_id'];
require_once("db_link_close.php");
?>