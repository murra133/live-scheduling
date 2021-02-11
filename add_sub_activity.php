<?php
$user = 'root';
$password = 'root';
$db = 'coursera';
$host = 'localhost';
$port = 3307;

$link = mysqli_init();
$conn = mysqli_real_connect(
   $link, 
   $host, 
   $user, 
   $password, 
   $db,
   $port
);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

?>
    <div id="box">
        <div id = "main_id"></div>
        <div id="activity_title" class = "activity_title">
            <h3>Sub Activity Title</h3>
            <input id="activity_title_input" type="text">
        </div>
        <div id="start_date_box" class = "start_date_box">
            <h3>Start Date:</h3>
            <input type="date" id = "start_date_input_box" class = "start_date_input_box">
        </div>
        <div id="end_date_box" class = "end_date_box">
            <h3>End Date:</h3>
            <input id ="end_date_input_box" class = "end_date_input_box" type="date">
        </div>
        <div id="duration_box">
            <h3 class = "duration">Duration:</h3>
            <input id="duration" type="interger">
        </div>
        <div id="party_involved" class = "party_involved">
            <h3>Party Involved</h3>
            <select id="party_involved_box">
                <option value = "none">Choose an Option</option>
                <option value="Carpet USA">Carpet USA</option>
                <option value ="Helix">Helix</option>
                <option value = "Southland">Southland</option>
            </select>
        </div>
        <div id="relationship" class = "relationship">
            <h3>Relationship</h3>
            <div id="relationship_div"></div> 
            <button>Input Relationships</button>
        </div>
        <button type="submit" onclick="form_to_schedule(this)">Submit Button</button>
    </div>
