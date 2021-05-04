////////Settings for Project s//////
$(document).ready(function(){
    window.project_id = cookie_value('project_id');

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
            var p_holiday = js_data['Holidays'];

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
            if (p_holiday != null){
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
            } 
        }


})
});

function update_project_info(){
    var address = document.getElementById('address').value;
    var name = document.getElementById('projectname').value;
    var desc = document.getElementById('projectdesc').value;
    var sdate = document.getElementById('projectsdate').value;
    var edate = document.getElementById('projectedate').value;
    console.log(address)
    var action = 'project_information';
    $.post( "../PHP/update_project_settings.php", { project_id: window.project_id, action:action,name:name,desc:desc,sdate:sdate,edate:edate,address:address} );
    return false;
}