<?php
require_once('db_link.php');
?>
    <div id="box">
        <div id = "main_id"></div>
        <div id="activity_title" class = "activity_title">
            <h3>Sub Activity Title</h3>
            <input id="activity_title_input" type="text">
        </div>
        <div id="start_date_box" class = "start_date_box">
            <h3>Start Date:</h3>
            <input type="date" id = "start_date_input_box">
        </div>
        <div id="end_date_box" class = "end_date_box">
            <h3>End Date:</h3>
            <input id ="end_date_input_box" type="date">
        </div>
        <div id="duration_box">
            <h3 class = "duration">Duration:</h3>
            <input id="duration" type="interger">
        </div>
        <div id="party_involved" class = "party_involved">
            <h3>Party Involved</h3>
            <select>
                <option value = "none">Choose an Option</option>
                <option value="Carpet_USA">Carpet USA</option>
                <option value ="Helix">Helix</option>
                <option value = "Southland">Southland</option>
            </select>
        </div>
        <div id="relationship" class = "relationship">
            <h3>Relationship</h3>
            <div id="relationship_div"></div> 
            <button>Input Relationships</button>
        </div>
        <button type="submit" onclick="Add_Activity_title()">Submit Button</button>
    </div>
