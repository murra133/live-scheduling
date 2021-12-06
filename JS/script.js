// ------ Brian's JavaScript------//
//------------General Scripts Start-------//
// --------- Cookie Script ---------//
function ReadCookie() {
  //// Np Input, Returns Array with all Cookies
 var allcookies = document.cookie;
 
 // Get all the cookies pairs in an array
 var cookiearray = allcookies.split(';');
 
 return cookiearray;
}
function WriteCookie(Cookie_Value_Str) {
  ///// Input is Cookie value as a string ex. input = "Cookie1=24;Cookie2=12"
  var  cookiearray = Cookie_Value_Str.split(';');

  for(var i=0;i<cookiearray.length;i++){
      document.cookie = cookiearray[i];

  }
}

function cookie_value(input_cookie){
var all_cookies = ReadCookie();
var cookies_variable_array = Array();
for(var n=0; n<all_cookies.length;n++){
  cookies_variable_array[n]=all_cookies[n].split("=")[0].trim();
}
if (cookies_variable_array.includes(input_cookie)){
  var index = cookies_variable_array.indexOf(input_cookie);
  var result_value = all_cookies[index].split("=")[1].trim();
  return result_value;
}
else{
return false;
}
};

function add_box_blur_background(url){
  //////Submit URL for page to load as if you were pulling it from the javascript Ex. "../HTML/add_sub_activity.html"////
  document.getElementById("main_page").style.blur = "10px";
  $('#content_box').load(url);
  $("#main_page").css({
    "-webkit-filter": "blur(3px)", 
    "-moz-filter": "blur(3px)", 
    "-o-filter": "blur(3px)", 
    "-ms-filter": "blur(3px)", 
    "filter": "blur(3px)", 
  }
);
}

function weekend_date_transform(server_value){
  ///Input is the server value for the weekend returns and array for the days off///
  if (server_value == "1"){
    return [6,0];
  }
  else if(server_value == "2"){
    return [5,6];
  }
  else if(server_value == "3"){
    return [0];
  }
  else if(server_value == "4"){
    return [6];
  }
  else if(server_value == "5"){
    return [5];
  }
}

function weekday_name(weekday_value){
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  return(weekday[weekday_value]);
}

function standarize_dates_to_UTC(date){
  var offset = date.getTimezoneOffset();
  var time = date.getTime();
  var standard_date = new Date(time+(offset*60000));
  return standard_date;
}
//////NEEEED TO WORK ON THIS///////
//----------General Scripts End--------//
function upload_sub_activity(sub_id,action){
  
if(action == 'add'){
  var parent_id = sub_id.parentElement.parentElement.parentElement.parentElement.id
  remove_error(parent_id)
  var id = sub_id.id.split("_")[1]
  var array = ['name_','date_','contractor_','duration_','add_'];
  for(var i = 0; i<array.length;i++){
    console.log(array[i]+id)
    all_sub_activities_to_h5(array[i]+id)
  }
  var values_array = update_sub_activity(id)
  var name = values_array[0]
  var date = values_array[1]
  // var edate = values_array[2]
  var duration = values_array[2]
  var party_involved = values_array[3]
  var sub_id = values_array[4];
  var action = values_array[5]
  console.log(values_array)
  $.post( "../PHP/add_sub_activity.php",{ sub_id: parseInt(id), main_id: parseInt(parent_id), sub_activity:name , date:date, duration:parseInt(duration), party_involved:party_involved, project_id:window.project_id} );
}
else{
  var parent_id = document.getElementById("name_"+sub_id).parentElement.parentElement.parentElement.parentElement.id
  remove_error(parent_id)
  var values_array = update_sub_activity(sub_id)
  var name = values_array[0]
  var date = values_array[1]
  var duration = values_array[2]
  var party_involved = values_array[3]
  var sub_id = values_array[4];
  var action = values_array[5]
  var actualized = values_array[6]
  $.post( "../PHP/update_sub_activity.php",{ sub_id: parseInt(sub_id), sub_activity:name , date:date, duration:parseInt(duration), party_involved:party_involved, project_id:window.project_id,actualized:actualized} );
}

  

  }

function update_sub_activity(sub_id){
  ////Once the Edit button is clicked, it takes the tag where the edit button is located as an input, you can use this to find the ID///////////////
  var action = "update"
  var activity_title = document.getElementById("name_"+sub_id).innerHTML;
  var date = document.getElementById("date_"+sub_id).getAttribute("value");
  var duration = document.getElementById("duration_"+sub_id).innerHTML;
  var party_involved = document.getElementById("contractor_"+sub_id).innerHTML;
  if (document.getElementById('actualized_'+sub_id)!=null && document.getElementById('actualized_'+sub_id).checked == true){
    var actualized = 1
    }
  else{
    var actualized = 0
    }

  console.log("Actualized="+actualized)
  var values_array = [activity_title,date,duration,party_involved,sub_id,action,actualized];
  return values_array
}
////////////////////////////////////////////////////////////////////////////
//fetch main activity
$( document ).ready(function() {
  window.project_id = cookie_value('project_id');
  window.register_id = cookie_value('Registry_ID');
  var admin_level = 1;
  $.ajax({
    url : '../PHP/check_admin_level.php',
    type : 'POST',
    data : 'project_id='+window.project_id+'&register_id='+window.register_id,     
    success:function(data){
      var js_data_level = JSON.parse(data);
      if(js_data_level['admin_level']<4){
          $.ajax({
            url : '../PHP/pull_activity.php',
            type : 'POST',
            data : 'project_id='+window.project_id+'&admin_level='+admin_level,     
            success:function(data){
              var js_data = JSON.parse(data);
                var main_parent = document.getElementById("added_cell");
                var divadd = document.createElement('div');
                for (var i=0; i<Object.keys(js_data).length;i++){
                  /// Sets Variables///
                  var location = Object.keys(js_data)[i];
                  var main_id = js_data[location]["Main_ID"];
                  var main_title = js_data[main_id]['Main_Activity'];
                  /////Creates the Divs for the Main Title////

                  divadd = document.createElement('div');
                  divadd.setAttribute("id",main_id);
                  divadd.setAttribute("class","main_activity");
                  var divtitle=document.createElement("div")
                  divtitle.setAttribute("class","main_activity_title")
                  var title = document.createElement("h2");
                  title.setAttribute("name",main_title);
                  title.innerHTML = main_title;
                  title.setAttribute('class','title clickable');
                  title.setAttribute('id','title_'+main_id)
                  title.setAttribute('ondblclick','input_edit(this)')
                  
                  var delete_button= document.createElement("i");
                  delete_button.setAttribute("class","far fa-minus-square main_delete title clickable");
                  delete_button.setAttribute("id","delete_"+main_id);
                  delete_button.setAttribute("onclick","delete_main_activity_box(this)")
                  divtitle.appendChild(title);
                  divtitle.appendChild(delete_button);
                  // title.appendChild(edit);
                  divadd.appendChild(divtitle);
                  var sub_activities_array = js_data[main_id]['sub_activity'];
                  ////////////////////////////// Create all the Empty Divs/////
                  var empty_divs = create_all_sub_activity_divs();
                  var id_div = empty_divs[0];
                  var name_div = empty_divs[1];
                  var dateval_div = empty_divs[2];
                  // var edate_div = empty_divs[3];
                  var duration_div = empty_divs[3];
                  var contractor_div = empty_divs[4];
                  var bdate = empty_divs[5];
                  var actualized_div = empty_divs[6];
                  var activity_div = empty_divs[7];
                  var delete_div = empty_divs[8];
                  var date_div = document.createElement('div');
                  date_div.setAttribute('class','activity_right');
                  var action_div = document.createElement('div');
                  action_div.setAttribute('class','activity_left uncollapsed')
                  var collapsable_button = document.createElement('div')
                  collapsable_button.setAttribute('class','collapsable_button')
                  var c_button = document.createElement('i')
                  c_button.setAttribute('class','fas fa-ellipsis-v clickable')
                  c_button.setAttribute('onclick','collapse_activities(this)')
                  c_button.setAttribute('type','active')
                  c_button.setAttribute('id','collapse_'+main_id)
                  collapsable_button.appendChild(c_button)




                  ///Gets dates from bdate////
                  dates = bdate.getElementsByClassName("cell_dates")[0];

                  for (var j=0;j<Object.keys(sub_activities_array).length;j++){
                    //// Get All Sub Activities Variables////
                    var sub_id = Object.keys(sub_activities_array)[j];
                    var sub_activity_title = sub_activities_array[sub_id]["Sub_Activity"];
                    var sub_dates = sub_activities_array[sub_id]["Date"];
                    var sub_duration = sub_activities_array[sub_id]["Duration"];
                    var sub_party_involved = sub_activities_array[sub_id]["Party_Involved"];
                    var sub_actualized = sub_activities_array[sub_id]["Actualized"]
                    ////////// Adds Values to Sub Activity Box/////

                    var filled_divs = download_sub_activity(main_id,sub_id,sub_activity_title,sub_dates,sub_duration,sub_party_involved,dates,sub_actualized)
                    var sub_id_div = filled_divs[0];
                    var sub_name_div = filled_divs[1];
                    var sub_date_div = filled_divs[2];
                    // var sub_edate_div = filled_divs[3];
                    var sub_duration_div = filled_divs[3];
                    var sub_contractor_div = filled_divs[4];
                    var sub_actualized_div = filled_divs[5];
                    var sub_bdate_div = filled_divs[6];
                    var sub_delete_div = filled_divs[7];

                    var sub_start_date = date_format_changer3(sub_dates.split(" ")[0])
                    var sub_end_date = date_format_changer3(sub_dates.split(" ")[2])
                    var date_array = date_filler(sub_start_date, sub_end_date);
                    sub_bdate_div = log_dates_to_schedule(date_array,sub_bdate_div,"new")   

                    id_div.appendChild(sub_id_div);
                    name_div.appendChild(sub_name_div);
                    dateval_div.appendChild(sub_date_div);
                    // edate_div.appendChild(sub_edate_div);
                    duration_div.appendChild(sub_duration_div);
                    contractor_div.appendChild(sub_contractor_div);
                    bdate.appendChild(sub_bdate_div);
                    actualized_div.appendChild(sub_actualized_div);
                    delete_div.appendChild(sub_delete_div);
                    action_div.appendChild(id_div);
                    action_div.appendChild(name_div);
                    action_div.appendChild(dateval_div);
                    // action_div.appendChild(edate_div);
                    action_div.appendChild(duration_div);
                    action_div.appendChild(contractor_div);
                    action_div.appendChild(actualized_div);
                    action_div.appendChild(delete_div);
                    date_div.appendChild(bdate);
                    activity_div.appendChild(action_div)
                    activity_div.appendChild(collapsable_button)
                    activity_div.appendChild(date_div);
                    divadd.appendChild(activity_div);


                    

                  }
                  var error_div = document.createElement('div')
                  error_div.setAttribute('class','error_div')
                  var error_message = document.createElement('h6')
                  error_message.setAttribute('id','error_'+main_id)
                  error_message.setAttribute('class','error_message')
                  error_div.appendChild(error_message)
                  var subadd=document.createElement('div');
                  subadd.setAttribute("class","sub_activity_add clickable");
                  subadd.setAttribute("onclick","add_sub_activity(this)");
                  var subaddtwo=document.createElement("i");
                  subaddtwo.setAttribute("class","far fa-plus-square add_sub_activity_button");
                  subaddtwo.innerHTML="   Add Sub Activity";
                  subadd.appendChild(subaddtwo);
                  divadd.appendChild(error_div)
                  divadd.appendChild(subadd);
                  main_parent.appendChild(divadd)
                  
              

                  //Adds Div for Dates for Main Activity 
                }
                  
                }


        });
      }
      else{
        document.getElementById("push_all_button").style.display = "none";
        document.getElementById("main_activity_add").style.display = "none";
        $.ajax({
          url : '../PHP/pull_activity_general.php',
          type : 'POST',
          data : 'project_id='+window.project_id+'&admin_level='+admin_level,     
          success:function(data){
            var js_data = JSON.parse(data);
              //alert(js_data[0][0]);
              var main_parent = document.getElementById("added_cell");
              var divadd = document.createElement('div');
              for (var i=0; i<Object.keys(js_data).length;i++){
                /// Sets Variables///
                var location = Object.keys(js_data)[i];
                var main_id = js_data[location]["Main_ID"];
                var main_title = js_data[main_id]['Main_Activity'];
                /////Creates the Divs for the Main Title////

                divadd = document.createElement('div');
                divadd.setAttribute("id",main_id);
                divadd.setAttribute("class","main_activity");
                var divtitle=document.createElement("div")
                divtitle.setAttribute("class","main_activity_title")
                var title = document.createElement("h2");
                title.setAttribute("name",main_title);
                title.innerHTML = main_title;
                title.setAttribute('class','title');

                divtitle.appendChild(title);
                divadd.appendChild(divtitle);
                var sub_activities_array = js_data[main_id]['sub_activity'];
                ////////////////////////////// Create all the Empty Divs/////
                var empty_divs = create_all_sub_activity_divs();
                var id_div = empty_divs[0];
                var name_div = empty_divs[1];
                var sdate_div = empty_divs[2];
                var edate_div = empty_divs[3];
                var duration_div = empty_divs[4];
                var contractor_div = empty_divs[5];
                var bdate = empty_divs[6];
                var edit_div = empty_divs[7];
                var activity_div = empty_divs[8];
                var delete_div = empty_divs[9];


                ///Gets dates from bdate////
                dates = bdate.getElementsByClassName("cell_dates")[0];

                for (var j=0;j<Object.keys(sub_activities_array).length;j++){
                  //// Get All Sub Activities Variables////
                  var sub_id = Object.keys(sub_activities_array)[j];
                  var sub_activity_title = sub_activities_array[sub_id]["Sub_Activity"];
                  var sub_start_date = sub_activities_array[sub_id]["Start_Date"];
                  var sub_end_date = sub_activities_array[sub_id]["End_Date"];
                  var sub_duration = sub_activities_array[sub_id]["Duration"];
                  var sub_party_involved = sub_activities_array[sub_id]["Party_Involved"];
                  ////////// Adds Values to Sub Activity Box/////

                  var filled_divs = download_sub_activity(main_id,sub_id,sub_activity_title,sub_start_date, sub_end_date,sub_duration,sub_party_involved,dates)
                  var sub_id_div = filled_divs[0];
                  var sub_name_div = filled_divs[1];
                  var sub_sdate_div = filled_divs[2];
                  var sub_edate_div = filled_divs[3];
                  var sub_duration_div = filled_divs[4];
                  var sub_contractor_div = filled_divs[5];
                  var sub_edit_div = filled_divs[6];
                  var sub_bdate_div = filled_divs[7];
                  var sub_delete_div = filled_divs[8];

                  var date_array = date_filler(sub_start_date, sub_end_date);
                  for (var z=0; z <sub_bdate_div.children.length;z++){
                      log_dates_to_schedule(date_array,sub_bdate_div,'new')
                  }

                  id_div.appendChild(sub_id_div);
                  name_div.appendChild(sub_name_div);
                  sdate_div.appendChild(sub_sdate_div);
                  edate_div.appendChild(sub_edate_div);
                  duration_div.appendChild(sub_duration_div);
                  contractor_div.appendChild(sub_contractor_div);
                  bdate.appendChild(sub_bdate_div);
                 // edit_div.appendChild(sub_edit_div);
                  //delete_div.appendChild(sub_delete_div);
                  activity_div.appendChild(id_div);
                  activity_div.appendChild(name_div);
                  activity_div.appendChild(sdate_div);
                  activity_div.appendChild(edate_div);
                  activity_div.appendChild(duration_div);
                  activity_div.appendChild(contractor_div);
                  //activity_div.appendChild(edit_div);
                  //activity_div.appendChild(delete_div);
                  activity_div.appendChild(bdate);
                  divadd.appendChild(activity_div);

                  

                }
                main_parent.appendChild(divadd)
                
            

                //Adds Div for Dates for Main Activity 
              }
                
              }


      });
      }
    }
  });  

  $.ajax({
    url : '../PHP/pull_holidays.php',
    type : 'POST',
    data : 'project_id='+window.project_id,     
    success:function(data){
      var holidays_data = JSON.parse(data);
      holidays_date_array = new Array();
      holidays_name_array = new Array();
      holidays_id_array = new Array();
      for (var h=0;h<Object.keys(holidays_data).length;h++){
        holidays_date_array[h] =holidays_data[Object.keys(holidays_data)[h]][0]['HolidayDate'];
        holidays_name_array[h] =holidays_data[Object.keys(holidays_data)[h]][0]['HolidayName'];
        holidays_id_array[h] =Object.keys(holidays_data)[h];
      }
    }})
    $.ajax({
      url : '../PHP/pull_project_settings.php',
      type : 'POST',
      data : 'project_id='+window.project_id,     
      success:function(data){
        var settings = JSON.parse(data);
        weekend_value = settings['WorkWeek'];
      }})


var project_name = cookie_value('project_name');
document.getElementById('main_title').innerHTML = project_name+" Schedule";
});
//////////////////////////////////////////////////////////////////////////////
function delete_main_activity_box(delete_icon_tag){
  var main_id= delete_icon_tag.id.split("_")[1];
  var main_activity = document.getElementById('title_'+main_id)
  var main_activity_title = main_activity.getAttribute('name')
  var url = "../HTML/delete_confirm.html";
  add_box_blur_background(url);
  var action = "delete_main_activity";
  var id_array = [main_id,main_id,action];
  var message = "You sure you want to delete: <br>"+main_activity_title;
  setTimeout(add_id_to_box,150,id_array);
  setTimeout(add_value_to_message_box,150,message)

}
//////////////////////////////////////////////////////////////////
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
$(document).ready(function(){
 $.ajax({
    url : '../PHP/pull_parties.php',
    type : 'POST', 
    data : 'project_id='+window.project_id,  
    success:function(data){
      var js_data = JSON.parse(data);
         window.party_list = document.createElement('select')
        for (var i = 0; i < Object.keys(js_data).length; i++){
          var div_grid = document.createElement('div');
          var div_project = document.createElement('div');
          div_grid.className = "col-sm-2";
          div_project.className = "card overflow-auto";
          var location = Object.keys(js_data)[i];
          var main_id = js_data[location]["PARTY_ID"];
          var main_title = js_data[main_id]['PARTY_NAME'];
          var party_option = document.createElement("option");
          party_option.value = main_title;
          party_option.innerHTML = main_title;
          party_list.appendChild(party_option);
            ///submit_form(newFields2);          }

        


        }
        
        document.getElementById('party').replaceWith(window.party_list)
        var input = document.getElementById('party_div').children[1]
        console.log(input)
        input.setAttribute('id','party')
        var show_all = document.createElement('option')
        show_all.value='All'
        show_all.innerHTML='Show All'
        input.appendChild(show_all)
        input.value = 'All'
  }});

})

function error_message(message,id){
  document.getElementById('error_'+id).innerHTML = message
}

function remove_error(id){
  document.getElementById('error_'+id).innerHTML = ''
}
function date_range_picker(id_,action,value){
    var date_tag = document.getElementById(id_)
    var start_date = value.split(' ')[0]
    var end_date = value.split(' ')[2]
    $("#"+id_).daterangepicker({
      "startDate": start_date,
      "endDate": end_date,
      opens: 'center'
    }, function(start, end, label) {
      console.log('working_Inside')

      get_duration(start.format("YYYY-MM-DD"),end.format("YYYY-MM-DD"),id_.split('_')[1])
      var dates_str = start.format("MM/DD/YYYY")+" - "+end.format("MM/DD/YYYY")
      date_tag.setAttribute('value',dates_str)
      date_tag.innerHTML = dates_str
      if(action=='update'){
        field_edit(date_tag)
    }

    })
  }


//////////////////////////////////////////////////////////////////////
function input_edit(input_tag){
  var id_ = input_tag.id;
  var class_ = input_tag.getAttribute('class');
  var class_type = class_.split(' ')[0]
  var HTML = input_tag.innerHTML
  if (class_type == 'sub_name'){
    var input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('id',id_);
    input.setAttribute('class',class_);
    input.setAttribute('onChange','field_edit(this)')
    input.value = HTML;
    input_tag.replaceWith(input)
  }
  else if(class_type=='sub_date'){
  //   console.log('working')
    var input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('id',id_);
    input.setAttribute('class',class_);
    var value = input_tag.getAttribute('value')
    input.setAttribute('value',value);
    input_tag.replaceWith(input)
    date_range_picker(id_,'update',value)
  }
  else if(class_type == 'sub_duration'){
    var input = document.createElement('input');
    input.setAttribute('type','number');
    input.setAttribute('id',id_);
    input.setAttribute('class',class_);
    input.setAttribute('onChange','field_edit(this)')
    input.value = HTML
    input_tag.replaceWith(input)
  }
  else if(class_type == 'sub_contractor'){
    var input = window.party_list.cloneNode(true)
    input.setAttribute('id',id_);
    input.setAttribute('class',class_);
    input.setAttribute('onChange','field_edit(this)')
    input.value = HTML;
    input_tag.replaceWith(input)
  }
  else if(class_type == 'title'){
    var input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('id',id_);
    input.setAttribute('class',class_);
    input.setAttribute('onChange','field_edit(this)')
    input.value = input_tag.getAttribute('name');
    input_tag.replaceWith(input)
  }
}

////////////////////////////////////////////
function all_sub_activities_to_h5(id_){
  console.log(id_)
    var input_tag = document.getElementById(id_)
    var class_ = input_tag.getAttribute('class');
    var class_type = class_.split(' ')[0]
    var HTML = input_tag.value
    console.log(input_tag)
    console.log(HTML)
    if (class_type == 'sub_name'){
      var input = document.createElement('h5');
      input.setAttribute('class',class_);
      input.setAttribute('id',id_);
      input.setAttribute('onClick','input_edit(this)')
      input.innerHTML = HTML;
      input_tag.replaceWith(input)
    }
    else if(class_type=='sub_date'){
      var input = document.createElement('h5');
      input.setAttribute('class',class_);
      input.setAttribute('id',id_);
      input.setAttribute('onClick','input_edit(this)')
      input.setAttribute('value',HTML)
      input.innerHTML = HTML;
      input_tag.replaceWith(input)
  
    }
    else if(class_type == 'sub_contractor'){
      var input = document.createElement('h5');
      input.setAttribute('class',class_);
      input.setAttribute('id',id_);
      input.setAttribute('onClick','input_edit(this)')
      input.innerHTML = HTML;
      input_tag.replaceWith(input)
    }
    else if(class_type == "sub_duration"){
      var input = document.createElement('h5');
      input.setAttribute('class',class_);
      input.setAttribute('id',id_);
      input.setAttribute('onClick','input_edit(this)')
      input.innerHTML = HTML;
      input_tag.replaceWith(input)
    }
    else if(class_type == "fas"){
      var input = document.createElement('input');
      input.setAttribute("type","checkbox")
      input.setAttribute('class','sub_actualized sub_actualized_'+id_.split[1]);
      input.setAttribute('id','actualized_'+id_.split[1]);
      input_tag.replaceWith(input)

    }
}
//////////////////////////////////////////////////////////////////////
function field_edit(input_tag){
  var id_ = input_tag.id;
  var class_ = input_tag.getAttribute('class');
  var class_type = class_.split(' ')[0]
  var HTML = input_tag.value
  console.log(input_tag)
  console.log(HTML)
  if (class_type == 'sub_name'){
    var input = document.createElement('h5');
    input.setAttribute('class',class_);
    input.setAttribute('id',id_);
    input.setAttribute('onClick','input_edit(this)')
    input.innerHTML = HTML;
    input_tag.replaceWith(input)
  }
  else if(class_type=='sub_date'){
    var HTML = input_tag.getAttribute('value')
    var input = document.createElement('h5');
    input.setAttribute('class',class_);
    input.setAttribute('id',id_);
    input.setAttribute('onClick','input_edit(this)')
    input.setAttribute('value',HTML)
    input.innerHTML = HTML;
    input_tag.replaceWith(input)

  }
  else if(class_type == 'sub_contractor'){
    var input = document.createElement('h5');
    input.setAttribute('class',class_);
    input.setAttribute('id',id_);
    input.setAttribute('onClick','input_edit(this)')
    input.innerHTML = HTML;
    input_tag.replaceWith(input)
  }
  else if(class_type == "sub_duration"){
    var input = document.createElement('h5');
    input.setAttribute('class',class_);
    input.setAttribute('id',id_);
    input.setAttribute('onClick','input_edit(this)')
    input.innerHTML = HTML;
    input_tag.replaceWith(input)
  }
  else if(class_type == "title"){
    var input = document.createElement('h2');
    input.setAttribute('class',class_);
    input.setAttribute('id',id_);
    input.setAttribute('onClick','input_edit(this)')
    input.innerHTML = HTML;
    input_tag.replaceWith(input)
    var id = id_.split("_")[1]
    var input_value = HTML
    action = "update_main_activity"
    $.post( "../PHP/main_activity_add.php", { main_id: id, main_activity: input_value, action:action, project_id:window.project_id} );
    return
  }
  setTimeout(function(){
    upload_sub_activity(id_.split('_')[1])
  },500)
}
//////////////////////////////////////////////////////////////////////
/*Checks for today's date once the document loads and inputs it onto the start date div*/
function set_start_date(){
    var today = new Date();
    var day = today.getDay()
    today = new Date(today.getTime()-(parseInt(day)-1)*86400000)
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yy = today.getFullYear();
    document.getElementById("start_date").value= mm+"/"+dd+"/"+yy;
  }


////////////////////////////////////////////////////////////////////
function start_date_picker(date_input_tag){
  var start_date = date_input_tag.value
  $('#start_date').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    'startDate':start_date
  }, function(start, end, label) {
    date_input_tag.value = start.format("MM/DD/YYYY")
    var bdate_array = document.getElementsByClassName('sub_activity_bdate')
    for(var i=0;i<bdate_array.length;i++){
      var bdate_days = document.createElement("div");
      bdate_days.setAttribute("class","cell_days");
      var bdate_dates = document.createElement("div");
      bdate_dates.setAttribute("class","cell_dates");
      bdate_dates, bdate_days = three_week_ahead(bdate_dates,bdate_days);
      var bdate_children = bdate_array[i].children
      var length_ = bdate_children.length
      var id_array =[]
      for(var k=2;k<length_;k++){
        id_array.push(bdate_children[k].getAttribute('id').split("_")[1])
      }
      var id_
      removeAllChildNodes(bdate_array[i])
      bdate_array[i].appendChild(bdate_dates);
      bdate_array[i].appendChild(bdate_days);
      for(var k=0;k<length_-2;k++){
        id_ = id_array[k]
        var bdate_box = document.createElement("div");
        bdate_box.setAttribute("class","sub_bdate sub_activity_"+id_.toString());
        bdate_box.setAttribute("id","bdate_"+id_);
        bdate_box = date_box(bdate_box,id_,bdate_dates);
        bdate_array[i].appendChild(bdate_box)
        var dates = document.getElementById('date_'+id_).getAttribute('value')
        var start_date = date_format_changer3(dates.split(" ")[0])
        var end_date = date_format_changer3(dates.split(" ")[2])
        date_array = date_filler(start_date,end_date)
        log_dates_to_schedule(date_array,id_,'update')
      }



    }
  });
};
function remove_filters(remove_button){
  document.getElementById('date_range').value=''
  document.getElementById('viewable').value=3
  document.getElementById('party').value = 'All'
  apply_filters(remove_button)
}
function apply_filters(apply_button){
  var res_array =[]
  var count ={}
  var id_array = document.getElementsByClassName('sub_id')
  var m_activty = document.getElementsByClassName('main_activity')
  console.log(m_activty)
  for(var i=0;i<id_array.length;i++){
    res_array.push(id_array[i].id)
  }
  for(var k=0;k<m_activty.length;k++){
    count[m_activty[k].id]=0
  }
  /////Dates Filter
  var dates = document.getElementById('date_range').value
  var return_=filter_dates(dates,res_array,count)
  res_array=return_[0]
  count = return_[1]
  /////Actualized Filter
  var status = document.getElementById('viewable').value
  return_= filter_status(status,res_array,count)
  res_array=return_[0]
  count = return_[1]
  ///////Filter by Party
  var party = document.getElementById('party').value
  console.log(party)
  return_ = filter_parties(party,res_array,count)
  res_array=return_[0]
  count = return_[1]
  console.log(res_array)
  var m_activty = document.getElementsByClassName('main_activity')
  for (var i = 0; i< m_activty.length;i++){
    var parent_id = m_activty[i].id
    var parent_div = m_activty[i]
    var child_length = parent_div.getElementsByClassName('sub_id').length
    console.log("Child_leght="+child_length)
    console.log("Count="+count[parent_id])
    if (child_length == count[parent_id]){
      parent_div.setAttribute('style','display:none')
    }
    else{
      parent_div.removeAttribute('style')
    }
  }
  toggle_filters()
}

function filter_parties(party,res_array,count){
  var sres_array = []
  for(var i=0;i<res_array.length;i++){
    var party_div = document.getElementById('contractor_'+res_array[i])
    var value = party_div.innerHTML
    console.log(value)
    var activity_array = document.getElementsByClassName('sub_activity_'+res_array[i])
    if (value!=party&&party!='All'){
      var parent_id =party_div.parentElement.parentElement.parentElement.parentElement.id
      for(var k=0;k<activity_array.length;k++){
        activity_array[k].setAttribute('style','display:none')
      }
      count[parent_id]++
      continue
    }
    sres_array.push(res_array[i])
    for(var k=0;k<activity_array.length;k++){
      activity_array[k].removeAttribute('style')
    }


  }
  return [sres_array,count]
}
function filter_status(status,res_array,count){
  var sres_array=[]
  for(var i=0;i<res_array.length;i++){
    var act_div = document.getElementById('actualized_'+res_array[i])
    var parent_id = act_div.parentElement.parentElement.parentElement.parentElement.id
    var activity_array = document.getElementsByClassName('sub_activity_'+res_array[i])
    if (status==1&&act_div.checked == true){
      for(var k=0;k<activity_array.length;k++){
        activity_array[k].setAttribute('style','display:none')
      }
      count[parent_id]++
      continue
    }
    else if(status==2&&act_div.checked == false){
      for(var k=0;k<activity_array.length;k++){
        activity_array[k].setAttribute('style','display:none')
      }
      count[parent_id]++
      continue
    }
    else if((status==3)||(status==1&&act_div.checked==false)||(status==2&&act_div.checked==true)){
      for(var k=0;k<activity_array.length;k++){
        activity_array[k].removeAttribute('style')
      }
    }
    sres_array.push(res_array[i])
  }
  console.log(sres_array)
  return [sres_array,count]

}


function filter_dates(dates,res_array,count){
  if (dates==''){
    return [res_array, count]
  }
  var sres_array = []
  var start = dates.split(' ')[0]
  var end = dates.split(' ')[2]
  var date_array = document.getElementsByClassName('sub_date')
  var start_val = (new Date(start)).getTime()
  var end_val = (new Date(end)).getTime()
  for(var i=0;i<date_array.length;i++){
    var v_start = (new Date(date_array[i].getAttribute('value').split(' ')[0])).getTime()
    var v_end = (new Date(date_array[i].getAttribute('value').split(' ')[2])).getTime()
    var id_ = date_array[i].getAttribute('id').split('_')[1]
    var activity_array = document.getElementsByClassName('sub_activity_'+id_)
    if (v_end>=start_val&&v_start<=end_val){
      for(var k=0;k<activity_array.length;k++){
        activity_array[k].removeAttribute('style')
      }
      sres_array.push(id_)
    }
    else{
      for(var k=0;k<activity_array.length;k++){
        activity_array[k].setAttribute('style','display:none')
        
      }
      var parent_id = date_array[i].parentElement.parentElement.parentElement.parentElement.id
      count[parent_id]++
    }
  }
console.log(sres_array)
return [sres_array, count]
}

function filter_date_range(date_input_tag){
  if(date_input_tag.value==''){
    $('#date_range').daterangepicker({
      showDropdowns: true,
    }, function(start, end, label) {
      date_input_tag.value=start.format("MM/DD/YYYY")+' - '+end.format("MM/DD/YYYY")
    });
  }
  else{
    var start_date = date_input_tag.value.split(' ')[0]
    var end_date = date_input_tag.value.split(' ')[2]
    $('#date_range').daterangepicker({
      showDropdowns: true,
      'startDate':start_date,
      'endDate':end_date
    }, function(start, end, label) {
      date_input_tag.value=start.format("MM/DD/YYYY")+' - '+end.format("MM/DD/YYYY")
    });
  }
}
////////////////////////////////////////////////////////////////////////////

function toggle_filters(){
  var filter = document.getElementById('filter_div')
  var topbar = document.getElementById('topbar')
  if (filter.getAttribute('class')== 'navbar'){
    filter.setAttribute('class','navbar filter_active')
    topbar.setAttribute('class','navbar navbar-light bg-light justify-content-between navbar_active')
  }
  else{
    filter.setAttribute('class','navbar')
    topbar.setAttribute('class','navbar navbar-light bg-light justify-content-between')

  }
}
// $(document).ready(function add_filters(){


// }



////////////////////////////////////////////////////////////////////////
  function date_transform(date){
    ///takes input mm/dd and outputs yy-mm-dd (Only works if date is part of the current year)///
    var today = new Date();
    var dd = date.split("/")[1];
    var mm = date.split("/")[0];
    var yyyy = today.getFullYear();
    return(yyyy+"-"+mm+"-"+dd);
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////

  /* Creates the dates to go on the three week ahead using the existing start date*/
function three_week_ahead(bdate_dates,bdate_days){
  var m = 3
  var n;
  var date = document.getElementById("start_date").value;
  console.log(date)

  var dd = parseInt(date.split("/")[1]);
  var mm = parseInt(date.split("/")[0]); 
  var yy = parseInt(date.split("/")[2]);
  for(n=0;n<m*7;n++) {
    if (dd==32 && (mm==12)){
      dd=1;
      mm=1;
      yy=yy+1;
    }

    else if (dd==31 && (mm==4||mm==6||mm==9||mm==11)){
      dd=1;
      mm=mm+1;
    }
    else if ((dd==32 && (mm==1||mm==3||mm==5||mm==7||mm==8||mm==10||mm==12))){
      dd=1;
      mm=mm+1;
    }
    else if ((dd==29 && mm==2)){
      dd=1;
      mm=mm+1;
    }
    ndd=dd;
    nmm=mm;
    nyy=yy;

    if(ndd<10) 
    {
        ndd='0'+ndd;
    }     
    if(nmm<10) 
    {
        nmm='0'+nmm;
    } 
      var date = document.createElement("h3");
      date.setAttribute("class","date");
      date.innerHTML = nmm+'/'+ndd+'/'+nyy;
      var day_value = (standarize_dates_to_UTC(new Date(nyy+"-"+nmm+"-"+ndd))).getDay();
      var day = weekday_name(day_value);
      var day_tag = document.createElement("h3");
      day_tag.setAttribute("class","day");
      day_tag.innerHTML =day;
      bdate_dates.appendChild(date);
      bdate_days.appendChild(day_tag);
      dd=dd+1;
  }
  return bdate_dates , bdate_days
  };
//////////////////////////////////////////////////////////////////////////////
  /*Takes the start date and end date inputs and fills the respective cells*/


  function date_filler(sdate,edate){
    var ndd;
    var nmm;
    var nyy;
    var sdate_split = sdate.split("-");
    var edate_split = edate.split("-");
    var yy=parseInt(sdate_split[0]);
    var dd = parseInt(sdate_split[2]);
    var mm = parseInt(sdate_split[1]); 
    var eyy = parseInt(edate_split[0]);
    var edd = parseInt(edate_split[2]);
    var emm = parseInt(edate_split[1]);
    var n =0;
    var date = Array();
    while((ndd!=edd) || (nmm!=emm) || (nyy!=eyy)){
      if (dd==32 && (mm==12)){
        dd=1;
        mm=1;
        yy=yy+1;
      }
  
      else if (dd==31 && (mm==4||mm==6||mm==9||mm==11)){
        dd=1;
        mm=mm+1;
      }
      else if ((dd==32 && (mm==1||mm==3||mm==5||mm==7||mm==8||mm==10||mm==12))){
        dd=1;
        mm=mm+1;
      }
      else if ((dd==29 && mm==2)){
        dd=1;
        mm=mm+1;
      }
      ndd=''+dd;
      nmm=''+mm;
      nyy=''+yy;
      
  
      if(ndd<10) 
      {
          ndd='0'+ndd;
      }     
      if(nmm<10) 
      {
          nmm='0'+nmm;
      } 
        date[n] = nmm+'/'+ndd+'/'+nyy;
        dd=dd+1;
        n=n+1;
    }
    return (date);

    };

  /////////////////////////////////////////////////////////////////////////////
  function check_if_no_work(date,work_days_in_week){
    var dt = new Date(date);
    var day = parseInt(dt.getDay());
    if(work_days_in_week.indexOf(day)>=0){
      return false;
    }
    else{
      return true;
    }
  }

function log_dates_to_schedule(date_array,id_handler,action){
  if (action == 'new'){
    for(var z = 0; z<id_handler.children.length;z++){
      date = id_handler.children[z].id.split("_")[1]
      if (date_array.indexOf(date)>=0){
        id_handler.children[z].style.backgroundColor ="green";
      }
      if (check_if_no_work(date,weekend_date_transform(weekend_value))==false){
        id_handler.children[z].style.backgroundColor ="gray";
      }

    }
    return id_handler


  }
  else if (action=='update'){
    var id = id_handler
    var date_all = document.getElementById("bdate_"+id).children;
    for (var j = 0; j<date_all.length; j++){
      var date_j = date_all[j];
      date_j.style.backgroundColor = "white";
      if (check_if_no_work(date_j.id.split('_')[1],weekend_date_transform(weekend_value))==false){
        date_j.style.backgroundColor="gray";
      }
    }
    for(var i=0;i<date_array.length;i++){
      if(document.getElementById(id+"_"+date_array[i])!=null){
        document.getElementById(id+"_"+date_array[i]).style.backgroundColor = 'green'
        if (check_if_no_work(date_array[i],weekend_date_transform(weekend_value))==false){
          document.getElementById(id+"_"+date_array[i]).style.backgroundColor = 'gray'
        }
  
      }
    }
  
  }


}

//////////////////////////////////////////////////////////////////////////////
    /* Creates the boxes using the respective dates of the Div above*/
  function date_box(this_tag,id,this_dates){
    var dates = this_dates.getElementsByClassName("date");
    for (i=0;i<dates.length;i++){
      box_id = id+"_"+dates[i].innerHTML;
      var box = document.createElement("div");
      box.setAttribute("id",box_id);
      box.setAttribute("class","date_box")
      this_tag.appendChild(box);
    }
    return (this_tag);
  };

//////////////////////////////////////////////////////////////////////////////

function date_format_changer(date){
  ///input date yyyy-mm-dd output mm/dd/yy     ///////
  var formatted_date = date.split("-")[1]+"/"+date.split("-")[2]+"/"+date.split("-")[0].split('0')[1];
  return formatted_date;
}

function date_format_changer2(date){
    ///input date yyyy-mm-dd output mm/dd/yyyy   ///////
    var formatted_date = date.split("-")[1]+"/"+date.split("-")[2]+"/"+date.split("-")[0];
    return formatted_date;
  }

  function date_format_changer3(date){
    ///input date mm/dd/yyyy output yyyy-mm-dd   ///////
    var formatted_date = date.split("/")[2]+"-"+date.split("/")[0]+"-"+date.split("/")[1];
    return formatted_date;
  }

  function date_standard_to_yyyy_mm_dd_format(date){
    var dd = (date.getDate()).toString()
    var mm = (date.getMonth()+1).toString()
    var yyyy = (date.getFullYear()).toString()
    if(parseInt(dd)<10){
      dd="0"+dd
    }
    if(parseInt(mm)<10){
      mm="0"+mm
    }
    console.log(dd)
    var formatted_date = yyyy+"-"+mm+"-"+dd
    return formatted_date

  }
  //////////////////////////////////////////////////////////////////////////////
/* Adds the Main Activity Line */
  function add_main_activity(){
    var add_cell = document.getElementById('added_cell');
    var n =add_cell.lastChild.id;
    if(n == null){
      n=1;
    }
    else{
      n=parseInt(n)+1;
    };
    var main_div = document.createElement('div')
    main_div.setAttribute('class','main_activity_title')
    var input = document.createElement('input');
    input.setAttribute('class','title clickable');
    input.setAttribute('id','title_'+n);
    input.setAttribute('placeholder','Add Main Activity Title');
    var delete_button= document.createElement("i");
    delete_button.setAttribute("class","far fa-minus-square main_delete title clickable");
    delete_button.setAttribute("id","delete_"+n);
    delete_button.setAttribute("onclick","cancel_main_activity(this)")
    var add_button= document.createElement("i");
    add_button.setAttribute("class","far fa-plus-square main_add title clickable");
    add_button.setAttribute("id","add_"+n);
    add_button.setAttribute("onclick","change_input_to_title(this)")
    var div = document.createElement('div');
    div.setAttribute("id",n);
    div.setAttribute("class","main_activity");
    /*  Adds Div for Dates for Main Activity */
    var div_date_id = document.createElement("div");
    div_date_id.setAttribute("id","date_"+n)
    var cell_date = document.getElementById("cell_dates");
    /* Appends All childs */
    main_div.appendChild(input)
    main_div.appendChild(add_button)
    main_div.appendChild(delete_button)
    div.appendChild(main_div)
    add_cell.appendChild(div);
  };

//////////////////////////////////////////////////////////////////////////////
function update_main_activity(edit_tag){
  var div = edit_tag.parentElement.parentElement.parentElement;
  var old_child = edit_tag.parentElement.parentElement;
  var title = old_child.firstChild.getAttribute("name");
    var form=document.createElement('form')
    form.setAttribute("method","post");
    var inp = document.createElement('input');
    inp.setAttribute("type","text");
    inp.setAttribute("value",title);
    inp.setAttribute("class","main_activity_input");
    inp.setAttribute("name","main_activity_change");
    var submit = document.createElement("div");
    submit.setAttribute("type","submit");
    submitchild = document.createElement("i");
    submitchild.setAttribute("class","fa fa-check-square clickable")
    submitchild.setAttribute("onclick","change_input_to_title(this)")
    rejectchild = document.createElement("i");
    rejectchild.setAttribute("class","fa fa-times-circle-o");
    rejectchild.setAttribute("onclick","cancel_main_activity(this)")
    rejectchild.setAttribute("name",title);
    submit.appendChild(submitchild);
    submit.appendChild(rejectchild);
    form.appendChild(inp);
    form.appendChild(submit);
    div.replaceChild(form,old_child);





}

///////////////////////////////////////////////////////////////////////////////
function cancel_main_activity(cancel_tag){

  if (cancel_tag.getAttribute("name")!==null){
    var title = cancel_tag.getAttribute("name");

  }

}
//////////////////////////////////////////////////////////////////////////////
/* Creates the main activity title from an input format to a title*/
  function change_input_to_title(add_tag){
    var main_parent_element = add_tag.parentElement.parentElement;
    var input_parent= add_tag.parentElement;
    var input_value= input_parent.children[0].value;
    console.log(input_parent)
    var id=main_parent_element.id;
    var action = 'add_main_activity'
    var main_div=input_parent.parentElement;
    var subadd=document.createElement('div');
    subadd.setAttribute("class","sub_activity_add clickable");
    subadd.setAttribute("onclick","add_sub_activity(this)");
    var subaddtwo=document.createElement("i");
    subaddtwo.setAttribute("class","far fa-plus-square add_sub_activity_button");
    subaddtwo.innerHTML="   Add Sub Activity";
    subadd.appendChild(subaddtwo);
    var divtitle = document.createElement('div')
    divtitle.setAttribute('class','main_activity_title')
    var input = document.createElement('h2');
    input.setAttribute('class','title clickable');
    input.setAttribute('id','title_'+id);
    input.setAttribute('onClick','input_edit(this)')
    input.setAttribute('name',input_value)
    input.innerHTML = input_value;
    var delete_button= document.createElement("i");
    delete_button.setAttribute("class","far fa-minus-square main_delete title clickable");
    delete_button.setAttribute("id","delete_"+id);
    delete_button.setAttribute("onclick","delete_main_activity_box(this)")
    divtitle.appendChild(input)
    divtitle.appendChild(delete_button)
    removeAllChildNodes(main_parent_element)
    main_parent_element.appendChild(divtitle);
    main_parent_element.appendChild(subadd);
    console.log("id="+id)
    console.log('main_activty='+input_value)
    $.post( "../PHP/main_activity_add.php", { main_id: id, main_activity: input_value, action:action, project_id:window.project_id} );

  };

//////////////////////////////////////////////////////////////////////////////

  function add_id_to_box(id_array){
    document.getElementById("main_id").innerHTML=id_array[0];
      document.getElementById("main_id").setAttribute("name",id_array[1]+"_"+(parseInt(id_array[0])-parseInt(id_array[1])*1000));
      document.getElementsByClassName("box")[0].setAttribute("name",id_array[2]);
  }

  //////////////////////////////////////////////////////////////////////////////

  function create_all_sub_activity_divs(){
    var activity_div=document.createElement('div');
    activity_div.setAttribute("class","sub_activity");
    /* Add Title for ID */
    var id_div = document.createElement('div');
    id_div.setAttribute("class","sub_activity_id sub")
    var id_title = document.createElement("h3");
    id_title.setAttribute("class","id_title");
    id_title.innerHTML="Id";
    id_div.appendChild(id_title);
    /* Add Title for Activity */
    var name_div = document.createElement('div');
    name_div.setAttribute("class","sub_activity_name sub")
    var name_title = document.createElement("h3");
    name_title.setAttribute("class","activity_title");
    name_title.innerHTML="Activity";
    name_div.appendChild(name_title);
    /* Add Title for Start Date */
    var date_div = document.createElement('div');
    date_div.setAttribute("class","sub_activity_date sub")
    var date_title = document.createElement("h3");
    date_title.setAttribute("class","date_title");
    date_title.innerHTML="Dates";
    date_div.appendChild(date_title);

    /* Add Duration */
    var duration_div = document.createElement('div');
    duration_div.setAttribute("class","sub_activity_duration collapsable sub")
    var duration_title = document.createElement("h3");
    duration_title.setAttribute("class","duration_title");
    duration_title.innerHTML="Duration";
    duration_div.appendChild(duration_title);

    /* Add Party Invloved */
    var contractor_div = document.createElement('div');
    contractor_div.setAttribute("class","sub_activity_contractor collapsable sub")
    var contractor_title = document.createElement("h3");
    contractor_title.setAttribute("class","contractor_title");
    contractor_title.innerHTML="Party Involved";
    contractor_div.appendChild(contractor_title);

    /* Add Dates to the Activity Location */
    var bdate = document.createElement('div');
    bdate.setAttribute("class","sub_activity_bdate sub")
    var bdate_days = document.createElement("div");
    bdate_days.setAttribute("class","cell_days");
    var bdate_dates = document.createElement("div");
    bdate_dates.setAttribute("class","cell_dates");
    bdate_dates,bdate_days= three_week_ahead(bdate_dates,bdate_days);
    bdate.appendChild(bdate_dates);
    bdate.appendChild(bdate_days);

    /* Add edit to the Activity Location */
    var actualized_div = document.createElement('div');
    actualized_div.setAttribute("class","sub_activity_actualized collapsable sub")
    var actualized_title = document.createElement("h3");
    actualized_title.setAttribute("class","actualized");
    actualized_title.innerHTML = "A"
    actualized_div.appendChild(actualized_title);

    // Adds Delete Icon ///
    var delete_div = document.createElement('div');
    delete_div.setAttribute("class","sub_activity_delete collapsable sub")
    var delete_empty_title = document.createElement("div");
    delete_empty_title.setAttribute("class","delete_icon");
    delete_div.appendChild(delete_empty_title);

    return [id_div, name_div, date_div, duration_div,contractor_div, bdate, actualized_div, activity_div, delete_div];

  }
////////////////////////////////////////////////////////////////////
function download_sub_activity(main_id,sub_id,activity_title,date,duration,party_involved, dates,actualized){
  var parent_id = main_id;
  var id = sub_id;
  var p_id = document.createElement("h5");
  p_id.setAttribute("class","sub_id sub_activity_"+id.toString());
  p_id.setAttribute("id",id)
  if(id-Number(parent_id)*1000 < 10){
    var attribute_id="00"+(id-Number(parent_id)*1000).toString();
  }
  else if (id-Number(parent_id)*1000 < 100){
    var attribute_id="0"+(id-Number(parent_id)*1000).toString();
  }
  else{
    var attribute_id=(id-Number(parent_id)*1000).toString();
  }
  p_id.innerHTML=attribute_id;

  /* Create Activity */
  var input_activity = document.createElement("h5");
  input_activity.setAttribute("class","sub_name sub_activity_"+id.toString());
  input_activity.setAttribute("id","name_"+id.toString());
  input_activity.setAttribute('ondblclick','input_edit(this)')
  input_activity.innerHTML=activity_title;

   /* Create Start Date */
   var input_date = document.createElement("h5");
   input_date.setAttribute("class","sub_date sub_activity_"+id.toString());
   input_date.setAttribute("id","date_"+id.toString());
   input_date.setAttribute("value",date);
   input_date.setAttribute('onclick','input_edit(this)')
   input_date.innerHTML = date;

   //Create Duration//
   var input_duration = document.createElement("h5");
   input_duration.setAttribute("class","sub_duration sub_activity_"+id.toString());
   input_duration.setAttribute("id","duration_"+id.toString());
   input_duration.setAttribute('ondblclick','input_edit(this)')
   input_duration.innerHTML = duration;

     /* Create Contartcor Option */
   var input_contractor = document.createElement("h5");
   input_contractor.setAttribute("class","sub_contractor sub_activity_"+id.toString());
   input_contractor.setAttribute("id","contractor_"+id.toString());
   input_contractor.setAttribute('ondblclick','input_edit(this)')
   input_contractor.innerHTML = party_involved

   var input_actualized = document.createElement("input");
   input_actualized.setAttribute("type","checkbox")
   input_actualized.setAttribute("class","sub_actualized sub_activity_"+id.toString());
   input_actualized.setAttribute("id","actualized_"+id.toString());
   if(actualized==1){
     input_actualized.checked = true;
   }
   
   var delete_button= document.createElement("i");
   delete_button.setAttribute("class","far fa-minus-square delete_sub_icon clickable sub_activity_"+id.toString());
   delete_button.setAttribute("id","delete_"+id);
   delete_button.setAttribute("onclick","delete_sub_activity_box(this)")

   /* Create Date Box */
   var bdate_box = document.createElement("div");
   bdate_box.setAttribute("class","sub_bdate sub_activity_"+id.toString());
   bdate_box.setAttribute("id","bdate_"+id);
   date_box(bdate_box,id,dates);

   var filled_divs = [p_id, input_activity,input_date,input_duration,input_contractor, input_actualized,bdate_box, delete_button];
    return filled_divs;
  }

///////////////////////////////////////////////////////////////////////////////////////////////////
function check_for_active_inputs(add_sub_activity_tag){
  /*This function ensures that all inputs are submitted prior to starting a new activty*/
var main_div = add_sub_activity_tag.parentElement;
var main_id = main_div.id
var sub_array = main_div.getElementsByClassName('sub')
if(sub_array[0]!=null){
  for(var i=1;i<5;i++){
    if(sub_array[i].getElementsByTagName('input')[0]!=null){
      var message = "Error All Values Must Be Submitted Prior To starting New Activty"
      error_message(message,main_id)
      return false
    }
  }
}
return true

}

  //////////////////////////////////////////////////////////////////////////////
/* Adds a sub Activity to the corresponding main activty*/
function add_sub_activity(this_tag){
  if (check_for_active_inputs(this_tag)==false){
    return
  }
  else{
    var parent_div=this_tag.parentElement;
    var parent_id=parent_div.id;
    remove_error(parent_id)
    if (parent_div.children.length < 4){
      empty_divs = create_all_sub_activity_divs();
      var id_div = empty_divs[0];
      var name_div = empty_divs[1];
      var dateval_div = empty_divs[2];
      // var edate_div = empty_divs[3];
      var duration_div = empty_divs[3];
      var contractor_div = empty_divs[4];
      var bdate = empty_divs[5];
      var actualized_div = empty_divs[6];
      var activity_div = empty_divs[7];
      var delete_div = empty_divs[8];
      var date_div = document.createElement('div');
      date_div.setAttribute('class','activity_right');
      var action_div = document.createElement('div');
      action_div.setAttribute('class','activity_left uncollapsed')
      var collapsable_button = document.createElement('div')
      collapsable_button.setAttribute('class','collapsable_button')
      var c_button = document.createElement('i')
      c_button.setAttribute('class','fas fa-ellipsis-v clickable')
      c_button.setAttribute('onclick','collapse_activities(this)')
      c_button.setAttribute('type','active')
      c_button.setAttribute('id','collapse_'+parent_id)
          /// Create Error Div////
      var error_div = document.getElementById('error_'+parent_id)
    //////////////////////////////////////
      collapsable_button.appendChild(c_button)
        action_div.appendChild(id_div);
        action_div.appendChild(name_div);
        action_div.appendChild(dateval_div);
        // activity_div.appendChild(edate_div);
        action_div.appendChild(duration_div);
        action_div.appendChild(contractor_div);
        action_div.appendChild(actualized_div);
        action_div.appendChild(delete_div);
        date_div.appendChild(bdate);
        activity_div.appendChild(action_div)
        activity_div.appendChild(collapsable_button)
        activity_div.appendChild(date_div)
        parent_div.appendChild(activity_div);
        parent_div.appendChild(error_div)
        parent_div.appendChild(this_tag);
    }

    /* Add Id to sub activity number */
    var current_id=parent_div.getElementsByClassName("sub_id");
    if( current_id.length>0){
    var id=Number(current_id[current_id.length-1].id) +1;
    }
    else{
      var id = parseInt(parent_id)*1000+1;
    }
    /*  Create ID */
    var id_parent= parent_div.getElementsByClassName("sub_activity_id")[0];
    var p_id = document.createElement('h5');
    p_id.setAttribute("class","sub_id sub_activity_"+id.toString());
    p_id.setAttribute("id",id)
    if(parseInt(id)-Number(parent_id)*1000 < 10){
      var attribute_id="00"+(id-Number(parent_id)*1000).toString();
    }
    else if (parseInt(id)-Number(parent_id)*1000 < 100){
      var attribute_id="0"+(id-Number(parent_id)*1000).toString();
    }
    else{
      var attribute_id=(parseInt(id)-Number(parent_id)*1000).toString();
    }
    p_id.innerHTML=attribute_id;
    id_parent.appendChild(p_id);

    /* Create Activity */
    var activity_parent= parent_div.getElementsByClassName("sub_activity_name")[0];
    var input_activity = document.createElement("input");
    input_activity.setAttribute('type','text')
    input_activity.setAttribute("class","sub_name sub_activity_"+id.toString());
    input_activity.setAttribute("id","name_"+id.toString());
    activity_parent.appendChild(input_activity);

    /* Create Start Date */
    var date_parent= parent_div.getElementsByClassName("sub_activity_date")[0];
    console.log(date_parent)
    var input_date = document.createElement("input");
    input_date.setAttribute('type','text')
    input_date.setAttribute("class","sub_date sub_activity_"+id.toString());
    input_date.setAttribute("id","date_"+id.toString());
    input_date.setAttribute("onfocus","date_range_picker(this.id,'new',this.value)");
    var today_ = date_format_changer2(date_standard_to_yyyy_mm_dd_format(new Date()))
    input_date.setAttribute('value',today_+" - "+today_)
    date_parent.appendChild(input_date);

    //Create Duration//
    var duration_parent= parent_div.getElementsByClassName("sub_activity_duration")[0];
    var input_duration = document.createElement("input");
    input_duration.setAttribute('type','number')
    input_duration.setAttribute("class","sub_duration sub_activity_"+id.toString());
    input_duration.setAttribute("id","duration_"+id.toString());
    input_duration.value=1
    duration_parent.appendChild(input_duration);

      /* Create Contartcor Option */
    var contractor_parent= parent_div.getElementsByClassName("sub_activity_contractor")[0];
    var input_contractor = window.party_list.cloneNode(true)
    input_contractor.setAttribute("class","sub_contractor sub_activity_"+id.toString());
    input_contractor.setAttribute("id","contractor_"+id.toString());
    contractor_parent.appendChild(input_contractor);

    //// Create Add Button////
    var add_parent= parent_div.getElementsByClassName("sub_activity_actualized")[0];
    var add = document.createElement("i");
    add.setAttribute("class","far fa-plus-square add_sub_icon clickable sub_activity_"+id.toString());
    add.setAttribute("id","add_"+id);
    add.setAttribute("onclick","upload_sub_activity(this,'add')")
    add_parent.appendChild(add);

    ////Create Delete Button/////
    var delete_parent_div = parent_div.getElementsByClassName('sub_activity_delete')[0];
    var delete_button= document.createElement("i");
    delete_button.setAttribute("class","far fa-minus-square delete_sub_icon clickable sub_activity_"+id.toString());
    delete_button.setAttribute("id","delete_"+id);
    delete_button.setAttribute("onclick","delete_sub_activity_box(this)");
    delete_parent_div.appendChild(delete_button);

    /* Create Date Box */
    var bdate_parent= parent_div.getElementsByClassName("sub_activity_bdate")[0];
    var bdate_box = document.createElement("div");
    bdate_box.setAttribute("class","sub_bdate sub_activity_"+id.toString());
    bdate_box.setAttribute("id","bdate_"+id);
    dates=bdate_parent.getElementsByClassName("cell_dates")[0];
    date_box(bdate_box,id,dates);
    bdate_parent.appendChild(bdate_box);
    var action = "new";
    var id_array = [id,parent_id, action]

  }
}
//////////////////////////////////////////////////////////////////////////////
function number_of_days_from_date(date){
  //Input in yyyy-mm-dd//
  var yyyy = date.split("-")[0];
  var v_mm = date.split("-")[1];
  var dd = date.split("-")[2];

  var n_yyyy=parseInt(yyyy)*365;
  var n_dd = parseInt(dd);
  var n_mm=0;
  for(mm=1;mm<=parseInt(v_mm);mm++){
    if ((mm==4||mm==6||mm==9||mm==11)){
      n_mm=30+n_mm;
    }
    else if ((mm==1||mm==3||mm==5||mm==7||mm==8||mm==10||mm==12)){
      n_mm=31+n_mm;
    }
    else if (( mm==2)){
      n_mm=28+n_mm;
    }
}
  var number_days = n_yyyy+n_dd+n_mm;
  return(number_days);

}
//////////////////////////////////////////////////////////////////////////////
function return_duration(start_date,end_date,holidays_array,weekend_days){
  //Input is start_date in yyyy-mm-dd, end_date in yyyy-mm-dd, holidays_array in yyyy-mm-dd, weekend_days
  var day = (standarize_dates_to_UTC((new Date (start_date)))).getDay();
  var weekend = weekend_date_transform(weekend_days);
  var duration = 0;
  var date = new Date(start_date).getTime();
  var e_date = ((new Date(end_date))).getTime();
  var duration = 1;
  while(date != e_date){
    date = 86400000+date;
    if((date+3600000==e_date)){
      date = date+3600000
      continue
    }
    if(weekend.indexOf(day)>=0){
      day = day+1
    }
    else{
      duration=duration+1
      day = day+1
    }
    if(day>6){
      day=0
    }
  }

  return (duration);
}

function return_end_date(start_date, duration, holidays_array, weekend_days){
    //Input is start_date in yyyy-mm-dd, duration in number of days, holidays_array in yyyy-mm-dd, weekend_days
    var day = (standarize_dates_to_UTC((new Date (start_date)))).getDay();
    var weekend = weekend_date_transform(weekend_days);
    var date = (new Date(start_date)).getTime();
    var d = 1;

    while(d<=parseInt(duration)){
      date = date+86400000;
      if(weekend.indexOf(day)>=0){
        day = day+1
      }
      else{
        d=d+1
        day = day+1
      }
      if(day>6){
        day=0
      }

      // var flag = 0;
      // for (var w=0;w<workweek.length;w++){
      //   for(var h=0;h<holidays_array.length;h++){
      //     var hol_date = (new Date(holidays_array[h])).getTime();
      //     if (day ==workweek[w]||date == hol_date){
      //       flag++;
      //     }
      //   }
      // }
      // if (flag == 0){
      //   d=d+1;
      // }
      //         date = date = date + 86400000;
      //   day = (new Date(date)).getDay();
    }
    console.log(date)
    date = new Date(date);
    console.log(date)
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    var end_date = mm+"/"+dd+"/"+yyyy;
    return end_date;

}
//////////////////////////////////////////////////////////////////////////////
$(document).on('change','.sub_duration', function(){
  var duration = this.value;
  var id = this.id.split("_")[1]
  var date_tag = document.getElementById("date_"+id)
  var dates = date_tag.getAttribute('value')
  var start_date = dates.split(" ")[0]
  var holidays_date_array = []
  var end_date = return_end_date(start_date,duration,holidays_date_array,weekend_value);
  dates = start_date+" - "+end_date  
  date_tag.setAttribute('value',dates)
  date_tag.innerHTML = dates

  var date_array = date_filler(date_format_changer3(start_date),date_format_changer3(end_date));
  log_dates_to_schedule(date_array,id,'update')

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function get_duration(start_date,end_date,id){
  var holidays_date_array = []
  var duration = return_duration(start_date,end_date,holidays_date_array,weekend_value);
  var duration_tag = document.getElementById("duration_"+id);
  duration_tag.setAttribute('value',duration);
  duration_tag.value = duration
  duration_tag.innerHTML = duration

  var date_all = document.getElementById("bdate_"+id).children;
  for (var j = 0; j<date_all.length; j++){
    var date_j = date_all[j];
    date_j.style.backgroundColor = "white";
    if (check_if_no_work(date_j.id.split('_')[1],weekend_date_transform(weekend_value))==false){
      date_j.style.backgroundColor="gray";
    }
  }
  var date_array = date_filler(start_date,end_date);
  log_dates_to_schedule(date_array,id,'update')
}

//////////////////////////////////////////////////////////////////////

$(document).on('change','.sub_actualized',function(){
  console.log("Working")
  var id = this.getAttribute('id').split("_")[1]
  upload_sub_activity(id,'update')
})
/////////////////////////////////////////////////////////////////////////
function addDays(date, add_days) {
  ////Takes a date and the amount of days to add///
 var date_val = new Date(date);
 date_val.setDate(date_val.getDate() + add_days);
 return date_val;
}


//////////////////////////////////////////////////////////////////////////////
function transform_duration(start_date,duration,days_off){
  ///Add Holiday functionality later on **CHECK FUTUTRE**
  ///Transform durations depending on the number of work week days. Ex duration is 5 days starting on wednesday. due to the 2 day weekend return transformed duration to 7. If 6 day week, duration is 6.
  ///start_date in mm/dd/yyyy.
  ///days_off is a number from 0-6, Sunday = 0, Monday =1, Tuesday = 2, ETC...
  for(var n=0;n<=parseInt(duration);n++){
    var date = addDays(start_date,n);
    var day_week = (new Date(date)).getDay;
    for (var i = 0; i<days_off.length;i++){
      if(day_off[i]==day_week){
        duration=duration+1;
      } 
  }
  return duration;
}
}

/////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
function get_all_sub_tags_with_id(sub_id){
  //////This function gets all the sub tags with the sub id provided////
  var id_tag = document.getElementById(sub_id);
  var activity_tag = document.getElementById("name_"+sub_id);
  var date_tag = document.getElementById("date_"+sub_id);
  var duration_tag = document.getElementById("duration_"+sub_id);
  var party_involved_tag = document.getElementById("contractor_"+sub_id);
  var actualized_tag = document.getElementById("actualized_"+sub_id);
  var delete_tag = document.getElementById("delete_"+sub_id)
  var bdate_tag = document.getElementById("bdate_"+sub_id);
  return [id_tag,activity_tag,date_tag,duration_tag,party_involved_tag,actualized_tag,delete_tag,bdate_tag]
}

function add_value_to_message_box(message){
  document.getElementById("message").innerHTML = message;
}
//////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////
function delete_sub_activity_box(delete_icon_tag){
  var sub_id= delete_icon_tag.id.split("_")[1];
  var sub_tags_array = get_all_sub_tags_with_id(sub_id);
  var sub_activity_title = sub_tags_array[1].innerHTML;
  var url = "../HTML/delete_confirm.html";
  add_box_blur_background(url);
  var parent_id = delete_icon_tag.parentElement.parentElement.parentElement.id;
  var action = "delete_sub_activity";
  var id_array = [sub_id,parent_id,action];
  var message = "You sure you want to delete:<br>"+sub_activity_title;
  setTimeout(add_id_to_box,150,id_array);
  setTimeout(add_value_to_message_box,150,message)
}

function delete_selected_items(delete_button_tag){
  ////This function deletes any item that needs to be deleted. Input is the delete button. Use If statements to add other items to be deleted/////
  
  var action = document.getElementById("delete_box").getAttribute("name");
  var id = document.getElementById("main_id").innerHTML; ////this should be in the respective format ex id = 1001 for sub_id id=1 for main id/////
  console.log(id)
  var delete_button_parent = document.getElementById('delete_'+id).parentElement;

  if (action == 'delete_sub_activity'){
  ///Removes the deleted sub Activity////
  var sub_tags_array = get_all_sub_tags_with_id(id);
  for(var i = 0;i<sub_tags_array.length;i++){
    sub_tags_array[i].remove();
  }
}
else if(action=='delete_main_activity') {
  var main_activity_parent = document.getElementById(id);
  main_activity_parent.remove();
}
  




  ////Delete Activity/////

  $.post( "../PHP/delete_activity.php",{ id: parseInt(id), action:action,project_id:window.project_id} );
  var content_box = delete_button_tag.parentElement.parentElement;
  ///location.reload();

  removeAllChildNodes(content_box);
$('#main_page').removeAttr('style');
return false;

}

// function add_title(){
//   document.getElementById("search_bar_title").innerHTML += " Schedule";
// }

// function search_activity() { 
//   let input = document.getElementById('searchbar').value;
//   input=input.toLowerCase(); 
//   let x = document.getElementsByClassName('main_activity_title'); 
//   let y = document.getElementsByClassName('sub_name'); 
//   let contractor = document.getElementsByClassName('sub_contractor');
//   /*for (i = 0; i < x.length; i++) {  
//   } */
//   if(input==""){
//     for(var l=0;l<x.length;l++){
//       x[l].parentElement.removeAttribute('style');
//     }
//     for (var m = 0; m < y.length; m++){
//         y[m].parentElement.parentElement.parentElement.removeAttribute('style','display');
//         var split = y[m].id.split("_")[1];
//         var row = document.getElementsByClassName("sub_activity_"+split);
//         for (var k3=0;k3<row.length;k3++){
//           row[k3].style.display = "";
//         }
//     }
//   }
//   else{
//     for (var i = 0; i < x.length; i++) {  
//       if (!x[i].childNodes[0].textContent.toLowerCase().includes(input)) { 
//           x[i].parentElement.style.display="none"; 
//           for (var j = 0; j < y.length; j++){
//             if (y[j].textContent.toLowerCase().includes(input)||
//                 contractor[j].textContent.toLowerCase().includes(input)){
//               var split = y[j].id.split("_")[1];
//               y[j].parentElement.parentElement.parentElement.removeAttribute('style','display'); 
//               var row = document.getElementsByClassName("sub_activity_"+split);
//               for (var p=0;p<row.length;p++){
//                 row[p].style.removeAttribute('style');
//               }
//             }
//             else{
//               if(!y[j].parentElement.parentElement.parentElement.childNodes[0].childNodes[0].textContent.toLowerCase().includes(input)){
//                 var split = y[j].id.split("_")[1];
//                 var row = document.getElementsByClassName("sub_activity_"+split);
//                 for (var k=0;k<row.length;k++){
//                   row[k].style.display = "none";
//                 }
//               }
//               else{
//                 var split = y[j].id.split("_")[1];
//                 var row = document.getElementsByClassName("sub_activity_"+split);
//                 for (var k2=0;k2<row.length;k2++){
//                   row[k2].style.removeAttribute('style');
//                 }
//               }
//             }
//           }
//       } 
//       else { 
//           x[i].parentElement.removeAttribute('style');                  
//       } 
//     } 
//   }

// } 


function search_activity(){
  let input = document.getElementById('searchbar').value;
  if(input==''){
    remove_filters(input)
    toggle_filters()
    return
  }
  input = input.toLowerCase()
  let main_title = document.getElementsByClassName('title')
  console.log(main_title)
  for(var i=0;i<main_title.length;i++){
    if(main_title[i].tagName=='I'){
      continue
    }
    var main_id = main_title[i].id.split("_")[1]
    console.log(main_title[i].tagName)
    let title = main_title[i].textContent.toLowerCase()
    if(title.includes(input)){
      var main_div = document.getElementById(main_id)
      main_div.removeAttribute('style')
      continue
    }
    else{
      count = 0
      let sub_name = document.getElementById(main_id).getElementsByClassName('sub_name')
      for(var k=0;k<sub_name.length;k++){
        let activity = sub_name[k].textContent.toLowerCase()
        let id_ = sub_name[k].id.split("_")[1]
        let activity_array = document.getElementsByClassName('sub_activity_'+id_)
        if(activity.includes(input)){
          for(let z=0;z<activity_array.length;z++){
            activity_array[z].removeAttribute('style')
          }
        }
        else{
          for(let z=0;z<activity_array.length;z++){
            activity_array[z].setAttribute('style','display:none')
          }
          count++
        }
      }
      if(count==sub_name.length){
        document.getElementById(main_id).setAttribute('style','display:none')
      }
      else{
        document.getElementById(main_id).removeAttribute('style')
      }
    }
  }
}



function add_function_to_search(function_call){
  var search_tag =document.getElementById('searchbar');
  search_tag.setAttribute('onkeyup',function_call);
  var search_title = document.getElementById("search_bar_title");
  search_title.innerHTML += " title";
}

function push_to_all(){
  $.post( "../PHP/push_to_all.php", { project_id:window.project_id});
}

function add_function_to_push(function_call){
  var search_tag =document.getElementById('push_all_button');
  search_tag.setAttribute('onclick',function_call);
}

function cancel_box(cancel_button_tag){
  var content_box = cancel_button_tag.parentElement.parentElement;
  ///location.reload();


  removeAllChildNodes(content_box);
$('#main_page').removeAttr('style');
return false;

}


//////////////////////////////////////////////////////////////////////
function collapse_activities(collapse_button){
  var action = collapse_button.getAttribute('type');
  var id = collapse_button.getAttribute('id').split('_')[1];
  var parent_div = document.getElementById(id);
  var children_array = parent_div.getElementsByClassName('collapsable')
  var activities_div = parent_div.getElementsByClassName('activity_left')[0];
  var name_div = parent_div.getElementsByClassName('sub_activity_name')[0]
  var date_div = parent_div.getElementsByClassName('sub_activity_date')[0]
  // var edate_div = parent_div.getElementsByClassName('sub_activity_edate')[0]
  if (action == 'active'){
    collapse_button.setAttribute('type','hidden');
    activities_div.setAttribute('class','activity_left collapsed')
    name_div.setAttribute('class','sub_activity_name sub collapsed')
    date_div.setAttribute('class','sub_activity_date sub collapsed')
    // edate_div.setAttribute('class','sub_activity_edate sub collapsed')
    setTimeout(function (){
      for (var i =0; i<children_array.length;i++){
        children_array[i].style.display = 'none'
    }},0);

    // activities_div.style.width = '40%'
    // name_div.style.width = '65%'
    // sdate_div.style.width='14%'
    // edate_div.style.width='14%'
  }
  else{
    collapse_button.setAttribute('type','active');
    activities_div.setAttribute('class','activity_left')
    name_div.setAttribute('class','sub_activity_name sub')
    date_div.setAttribute('class','sub_activity_date sub')
    // edate_div.setAttribute('class','sub_activity_edate sub')
    setTimeout(function (){
      for (var i =0; i<children_array.length;i++){
        children_array[i].style.display = 'grid'
    }},1050);
    // name_div.style.width = '45%'
    // sdate_div.style.width='10%'
    // edate_div.style.width='10%'
  }
   
}