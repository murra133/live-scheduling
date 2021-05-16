function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
////////Settings for Project s//////
$(document).ready(function(){
    window.project_id = cookie_value('project_id');
    pull_project_info();
    pull_admin_settings();
    });

    function pull_project_info(){
        $.ajax({
            url : '../PHP/pull_project_settings.php',
            type : 'POST',
            data : 'project_id='+window.project_id,     
            success:function(data){
                var js_data = JSON.parse(data);
                var p_name = js_data['ProjectName'];
                var p_desc = js_data['ProjectDescription'];
                var p_sdate = js_data['ProjectStart'];
                var p_edate = js_data['ProjectEnd'];
                var p_address = js_data['ProjectAddress'];
                var p_workweek = js_data['WorkWeek'];
                var p_startday = js_data['Start_Day'];
    
                ////Project Name
                document.getElementById('projectname').value = p_name;
                /// Project Description
                if (p_desc != null){
                    document.getElementById('projectdesc').value = p_desc;
                }
                /// Project Start Date
                if (p_sdate != null){
                    document.getElementById('projectsdate').value = p_sdate;
                }
                /// Project Start Date
                if (p_edate != null){
                    document.getElementById('projectedate').value = p_edate;
                }
                /// Address
                if (p_address != null){
                    document.getElementById('address').value = p_address;
                }
                    document.getElementById('workweek').value = p_workweek ;
                    document.getElementById('start_day').value=p_startday
                /*if (p_holiday != null){
                    var holidays = new Array();
                    holidays = p_holiday.split(',');
                    var holiday_tag = document.getElementById('sample_holidays').cloneNode(true);
                    for(var h=0; h<holidays.length;h++){
                        var holiday_name = holidays[h].split('_')[0];
                        var holiday_date = holidays[h].split('_')[1];
                        holiday_tag.childNodes[0].value = holiday_name;
                        holiday_tag.childNodes[1].value = holiday_date;
                        holiday_tag.removeAttribute('style');
                        document.getElementById('sample_holidays').parentElement.appendChild(holiday_tag);
    
                    }
                } */
            }
    
    
    })

    }

    function reset_changes(action){
        if (action =="admin_settings"){
            var admin_array = document.getElementsByClassName('user_admin_input');
            for (var k=0;k<admin_array.length;k++){
                if(admin_array[k].id != "admin_sample"){
                    admin_array[k].remove();
                    k=k-1;
                }
            }
        }
        pull_admin_settings()
    }

    function pull_admin_settings(){
        $.ajax({
            url : '../PHP/check_admin_level.php',
            type : 'POST',
            data : 'project_id='+window.project_id,     
            success:function(data){
                 //////WORK ON THIS ADD FUNCTIONALITY TO ADMIN SETTINGS/////
                var admin_data = JSON.parse(data);
                for(var a=0;a<admin_data.length;a++){
                    var admin_level = admin_data[a]['admin_level'];
                    var register_id = admin_data[a]['Register_id'];
                    $.ajax({
                        url : '../PHP/pull_user_from_registry.php',
                        type : 'POST',
                        data : 'register_id='+register_id+'&project_id='+window.project_id,     
                        success:function(data){
                            var admin_tag = document.getElementById('admin_sample').cloneNode(true);
                            admin_tag.removeAttribute('style');
                            admin_tag.removeAttribute('id');
                            var register_data = JSON.parse(data);
                            var firstName= register_data['FirstName'];
                            var lastName = register_data['LastName'];
                            var email = register_data['Email'];
                            var admin_level = register_data['admin_level'];
                            if (admin_level != "1"){
                                admin_tag.getElementsByClassName('admin_level')[0].value = admin_level;
                                admin_tag.getElementsByClassName('firstname')[0].value = firstName;
                                admin_tag.getElementsByClassName('lastname')[0].value = lastName;
                                admin_tag.getElementsByClassName('email')[0].value = email;
                                document.getElementById('admin_sample').parentElement.appendChild(admin_tag);
                            }
                            else{
                                document.getElementsByClassName('firstname')[0].innerHTML = firstName;
                                document.getElementsByClassName('lastname')[0].innerHTML = lastName;
                                document.getElementsByClassName('email')[0].innerHTML = email;
                            }
        
                        }})
                        //////Add delay to function
                }
        
            }
        })

    }

function update_project_info(){
    var address = document.getElementById('address').value;
    var name = document.getElementById('projectname').value;
    var desc = document.getElementById('projectdesc').value;
    var sdate = document.getElementById('projectsdate').value;
    var edate = document.getElementById('projectedate').value;
    var action = 'project_information';
    $.post( "../PHP/update_project_settings.php", { project_id: window.project_id, action:action,name:name,desc:desc,sdate:sdate,edate:edate,address:address} );
    return false;
}

function update_admin(){

    var email_array = document.getElementsByClassName('email');
    var admin_level = document.getElementsByClassName('admin_level');
    var post_emails = new Array;
    var post_admin = new Array;
    for (var k=0; k<email_array.length;k++){
        post_emails[k]=email_array[k].value;
        console.log(email_array.length);
        
    }
    for (var i=0; i<admin_level.length;i++){
        post_admin[i]=admin_level[i].value;
    }
    post_emails=post_emails.toString();
    post_admin=post_admin.toString();

    console.log(post_emails)
    console.log(post_admin)


    $.post('../PHP/update_admin_level.php',{emails:post_emails,admin_levels:post_admin,project_id:window.project_id});


}


function add_holidays(add_button){
    var holiday_tag = document.getElementById("sample_holidays");
    var parentElement = holiday_tag.parentElement;
    var cloned_tag = holiday_tag.cloneNode(true);
    cloned_tag.removeAttribute('id');
    cloned_tag.removeAttribute('style');
    parentElement.appendChild(cloned_tag);
}