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
  var id = sub_id.id.split("_")[1]
  var array = ['name_','sdate_','edate_','contractor_','duration_','add_'];
  for(var i = 0; i<array.length;i++){
    console.log(array[i]+id)
    all_sub_activities_to_h5(array[i]+id)
  }
  var values_array = update_sub_activity(id)
  var name = values_array[0]
  var sdate = values_array[1]
  var edate = values_array[2]
  var duration = values_array[3]
  var party_involved = values_array[4]
  var sub_id = values_array[5];
  var action = values_array[6]
  $.post( "../PHP/add_sub_activity.php",{ sub_id: parseInt(id), main_id: parseInt(main_id), sub_activity:activity_title , start_date:start_date, end_date:end_date, duration:parseInt(duration), party_involved:party_involved, project_id:window.project_id} );
}
else{
  var values_array = update_sub_activity(sub_id)
  var name = values_array[0]
  var sdate = values_array[1]
  var edate = values_array[2]
  var duration = values_array[3]
  var party_involved = values_array[4]
  var sub_id = values_array[5];
  var action = values_array[6]
  $.post( "../PHP/update_sub_activity.php",{ sub_id: parseInt(sub_id), sub_activity:name , start_date:sdate, end_date:edate, duration:parseInt(duration), party_involved:party_involved, project_id:window.project_id} );
}

  

  }

function form_to_schedule(this_tag){
  var parent_element = this_tag.parentElement.parentElement;
  var id = document.getElementById("main_id").innerHTML;
  var activity_title = document.getElementById("activity_title_input").value;
  var start_date = document.getElementById("start_date_input_box").value;
  var start_date_format = date_format_changer(start_date);// start_date.split("-")[1]+"/"+start_date.split("-")[2];
  var end_date = document.getElementById("end_date_input_box").value;
  var end_date_format = date_format_changer(end_date); // end_date.split("-")[1]+"/"+end_date.split("-")[2];
  var duration = document.getElementById("duration").value;
  var party_involved = document.getElementById("party_involved_box").value;
  ////Need to add section for Relationships once relationships are figured out///
  var id_array= document.getElementById("main_id").getAttribute("name");
  var main_id = id_array.split("_")[0];
  
  //Adds the Main Activity Title
  document.getElementById("name_"+id).innerHTML=activity_title;
  document.getElementById("sdate_"+id).innerHTML=start_date_format;
  document.getElementById("sdate_"+id).setAttribute("value",start_date);
  document.getElementById("edate_"+id).innerHTML=end_date_format;
  document.getElementById("edate_"+id).setAttribute("value",end_date);
  document.getElementById("contractor_"+id).innerHTML=party_involved;
  document.getElementById("duration_"+id).innerHTML=duration;
  var action = document.getElementById("box").getAttribute("name");
  if ( action == "new"){
  $.post( "../PHP/add_sub_activity.php",{ sub_id: parseInt(id), main_id: parseInt(main_id), sub_activity:activity_title , start_date:start_date, end_date:end_date, duration:parseInt(duration), party_involved:party_involved, project_id:window.project_id} );
  }
  else{
    $.post( "../PHP/update_sub_activity.php",{ sub_id: parseInt(id), sub_activity:activity_title , start_date:start_date, end_date:end_date, duration:parseInt(duration), party_involved:party_involved, project_id:window.project_id} );
  }
  
  removeAllChildNodes(parent_element);
  $('#main_page').removeAttr('style');
  return false;
  }
  //////////////////////////////////////////////////////////////////////////////////
  function place_values_in_subactivity_box(values_array){
    ////////value_array = [activity_title,start_date,end_date,duration,party_involved] format for dates is yyyy-mm-dd;
    document.getElementById("activity_title_input").value = values_array[0];
    document.getElementById("start_date_input_box").value=values_array[1];
    document.getElementById("end_date_input_box").value = values_array[2];
    document.getElementById("duration").value=values_array[3];
    document.getElementById("party_involved_box").value=values_array[4];
  }
function place_values_in_subactivity_box(values_array){
  ////////value_array = [activity_title,start_date,end_date,duration,party_involved] format for dates is yyyy-mm-dd;
  document.getElementById("activity_title_input").value = values_array[0];
  document.getElementById("start_date_input_box").value=values_array[1];
  document.getElementById("end_date_input_box").value = values_array[2];
  document.getElementById("duration").value=values_array[3];
  document.getElementById("party_involved_box").value=values_array[4];
}

function update_sub_activity(sub_id){
  ////Once the Edit button is clicked, it takes the tag where the edit button is located as an input, you can use this to find the ID///////////////
  var action = "update"
  var activity_title = document.getElementById("name_"+sub_id).innerHTML;
  var start_date = document.getElementById("sdate_"+sub_id).getAttribute("value");
  var end_date = document.getElementById("edate_"+sub_id).getAttribute("value");
  var duration = document.getElementById("duration_"+sub_id).innerHTML;
  var party_involved = document.getElementById("contractor_"+sub_id).innerHTML;
  var values_array = [activity_title,start_date,end_date,duration,party_involved,sub_id,action];
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
                  title.setAttribute('class','title');
                  var edit = document.createElement("i");
                  edit.setAttribute("class","fas fa-edit main_edit title clickable");
                  edit.setAttribute("id","edit_"+main_id);
                  edit.setAttribute("onclick","update_main_activity(this)")
                  
                  var delete_button= document.createElement("i");
                  delete_button.setAttribute("class","far fa-minus-square main_delete title clickable");
                  delete_button.setAttribute("id","delete_"+main_id);
                  delete_button.setAttribute("onclick","delete_main_activity_box(this)")
                  divtitle.appendChild(title);
                  title.appendChild(delete_button);
                  title.appendChild(edit);
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
                    sub_bdate_div = log_dates_to_schedule(date_array,sub_bdate_div,"new")   

                    id_div.appendChild(sub_id_div);
                    name_div.appendChild(sub_name_div);
                    sdate_div.appendChild(sub_sdate_div);
                    edate_div.appendChild(sub_edate_div);
                    duration_div.appendChild(sub_duration_div);
                    contractor_div.appendChild(sub_contractor_div);
                    bdate.appendChild(sub_bdate_div);
                    edit_div.appendChild(sub_edit_div);
                    delete_div.appendChild(sub_delete_div);
                    action_div.appendChild(id_div);
                    action_div.appendChild(name_div);
                    action_div.appendChild(sdate_div);
                    action_div.appendChild(edate_div);
                    action_div.appendChild(duration_div);
                    action_div.appendChild(contractor_div);
                    action_div.appendChild(edit_div);
                    action_div.appendChild(delete_div);
                    date_div.appendChild(bdate);
                    activity_div.appendChild(action_div)
                    activity_div.appendChild(collapsable_button)
                    activity_div.appendChild(date_div);
                    divadd.appendChild(activity_div);


                    

                  }
                  var subadd=document.createElement('div');
                  subadd.setAttribute("class","sub_activity_add clickable");
                  subadd.setAttribute("onclick","add_sub_activity(this)");
                  var subaddtwo=document.createElement("i");
                  subaddtwo.setAttribute("class","far fa-plus-square add_sub_activity_button");
                  subaddtwo.innerHTML="   Add Sub Activity";
                  subadd.appendChild(subaddtwo);
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
  var main_activity_title = delete_icon_tag.parentElement.getAttribute("name");
  var main_tag = document.getElementById(main_id);
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
//////////////////////////////////////////////////////////////////////////////
  /* This function changes the input date box int a block element once clicked*/
  function start_date_block_style(){
    
    var start_date_id = document.getElementById("start_date_input");
    function display_null(){
      start_date_id.style.display=null;
      start_date_id.setAttribute("name","yes");
    }
    if(start_date_id.getAttribute("name")=="yes"){
      start_date_id.setAttribute("name","no");
      start_date_id.style.display="block";
      return;
    }
    else{
      setTimeout(display_null,328);
    }
  };
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
  
  }});

})


function date_range_picker(id_,action){
  console.log(id_)
  var start_tag = document.getElementById('sdate_'+id_.split('_')[1])
  var end_tag = document.getElementById('edate_'+id_.split('_')[1])
    var start_date = date_format_changer2(start_tag.getAttribute('value'))
    var end_date = date_format_changer2(end_tag.getAttribute('value'))
    $("#"+id_).daterangepicker({
      "startDate": start_date,
      "endDate": end_date,
      opens: 'center'
    }, function(start, end, label) {
      console.log('working_Inside')

      get_duration(start.format("YYYY-MM-DD"),end.format("YYYY-MM-DD"),id_.split('_')[1])
      if(action=='update'){
        start_tag.setAttribute('value',start.format("YYYY-MM-DD"))
        start_tag.innerHTML = date_format_changer(start.format('YYYY-MM-DD'))
        end_tag.setAttribute('value',end.format("YYYY-MM-DD"))
        end_tag.innerHTML = date_format_changer(end.format('YYYY-MM-DD'))
        if(id_.split('_')[0]=="sdate"){
          field_edit(start_tag)
        }
        else{
          field_edit(end_tag)
        }
    }
    else{
      start_tag.setAttribute('value',date_format_changer2(start.format('YYYY-MM-DD')))
      start_tag.innerHTML = date_format_changer(start.format('YYYY-MM-DD'))
      end_tag.setAttribute('value',date_format_changer2(end.format('YYYY-MM-DD')))
      end_tag.innerHTML = date_format_changer(end.format('YYYY-MM-DD'))
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
  else if(class_type=='sub_sdate' || class_type == 'sub_edate'){
  //   console.log('working')
    var input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('id',id_);
    input.setAttribute('class',class_);
    input.setAttribute('value',input_tag.getAttribute('value'));
    input_tag.replaceWith(input)
    date_range_picker(id_,'update')
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
    else if(class_type=='sub_sdate' || class_type == 'sub_edate'){
      var HTML = input_tag.getAttribute('value')
      var date = date_format_changer(HTML)
      var input = document.createElement('h5');
      input.setAttribute('class',class_);
      input.setAttribute('id',id_);
      input.setAttribute('onClick','input_edit(this)')
      input.setAttribute('value',HTML)
      input.innerHTML = date;
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
      var input = document.createElement('i');
      input.setAttribute('class','fas fa-edit edit_sub_icon clickable sub_activity_1004');
      input.setAttribute('id','edit_'+id_.split[1]);
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
  else if(class_type=='sub_sdate' || class_type == 'sub_edate'){
    var HTML = input_tag.getAttribute('value')
    var date = date_format_changer(HTML)
    var input = document.createElement('h5');
    input.setAttribute('class',class_);
    input.setAttribute('id',id_);
    input.setAttribute('onClick','input_edit(this)')
    input.setAttribute('value',HTML)
    input.innerHTML = date;
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
  setTimeout(function(){
    upload_sub_activity(id_.split('_')[1])
  },500)
}
//////////////////////////////////////////////////////////////////////
/*Checks for today's date once the document loads and inputs it onto the start date div*/
  $(document).ready(function start_date_today(){
    var start_date_input = document.getElementById("start_date_input");
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yy = today.getFullYear();
    document.getElementById("start_date").innerHTML= mm+"/"+dd+"/"+yy;
  })
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
  var n;
  var date = document.getElementById("start_date").innerHTML;
  var dd = parseInt(date.split("/")[1]);
  var mm = parseInt(date.split("/")[0]); 
  var yy = parseInt(date.split("/")[2]);
  for(n=0;n<21;n++) {
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
    
    var div = document.createElement('div');
    div.setAttribute("id",n);
    div.setAttribute("class","main_activity");
    var form=document.createElement('form')
    form.setAttribute("method","post");
    var inp = document.createElement('input');
    inp.setAttribute("type","text");
    inp.setAttribute("class","main_activity_input");
    inp.setAttribute("name","main_activity"+n);
    var submit = document.createElement("div");
    submit.setAttribute("type","submit");
    submitchild = document.createElement("i");
    submitchild.setAttribute("class","fa fa-check-square clickable")
    submitchild.setAttribute("onclick","change_input_to_title(this)")
    rejectchild = document.createElement("i");
    rejectchild.setAttribute("class","fa fa-times-circle-o");
    rejectchild.setAttribute("onclick","cancel_main_activity(this)")
    /*  Adds Div for Dates for Main Activity */
    var div_date_id = document.createElement("div");
    div_date_id.setAttribute("id","date_"+n)
    var cell_date = document.getElementById("cell_dates");
    /* Appends All childs */
    submit.appendChild(submitchild);
    submit.appendChild(rejectchild)
    div.appendChild(form)
    form.appendChild(inp);
    form.appendChild(submit);
    add_cell.appendChild(div);
    cell_date.appendChild(div_date_id)
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
  function change_input_to_title(cancel_tag){
    var main_parent_element = cancel_tag.parentElement.parentElement.parentElement;
    var input_parent= cancel_tag.parentElement.parentElement;
    var input_value= input_parent.children[0].value;
    var id = input_parent.parentElement.id;
    if(input_value!=""){
      if (main_parent_element.children.length==1){
      var action = 'add_main_activity'
      var main_div=input_parent.parentElement;
      var subadd=document.createElement('div');
      subadd.setAttribute("class","sub_activity_add clickable");
      subadd.setAttribute("onclick","add_sub_activity(this)");
      var subaddtwo=document.createElement("i");
      subaddtwo.setAttribute("class","far fa-plus-square add_sub_activity_button");
      subaddtwo.innerHTML="   Add Sub Activity";
      subadd.appendChild(subaddtwo);
      var title = document.createElement("h2");
      title.setAttribute('class','title')
      title.setAttribute("name",input_value);
      var divtitle=document.createElement("div")
      divtitle.setAttribute("class","main_activity_title")
      title.innerHTML=input_value;
      var edit = document.createElement("i");
      edit.setAttribute("class","fas fa-edit main_edit title clickable");
      edit.setAttribute("id","edit_"+id);
      edit.setAttribute("onclick","update_main_activity(this)")
      
      var delete_button= document.createElement("i");
      delete_button.setAttribute("class","far fa-minus-square main_delete title clickable");
      delete_button.setAttribute("id","delete_"+id);
      delete_button.setAttribute("onclick","delete_main_activity_box(this)")
      for (i=0;i<main_div.children.length;i++) {
        child=main_div.children[i];
        main_div.removeChild(child);
    }
  
    
    title.appendChild(delete_button);
    title.appendChild(edit);
    divtitle.appendChild(title);
    main_div.appendChild(divtitle);
    main_div.appendChild(subadd);

    }
    else{
      var action = 'update_main_activity'
      var title = document.createElement("h2");
      title.setAttribute('class','title')
      title.setAttribute("name",input_value);
      var divtitle=document.createElement("div")
      divtitle.setAttribute("class","main_activity_title")
      title.innerHTML=input_value;
      var edit = document.createElement("i");
      edit.setAttribute("class","fas fa-edit main_edit title clickable");
      edit.setAttribute("id","edit_"+id);
      edit.setAttribute("onclick","update_main_activity(this)")
      
      var delete_button= document.createElement("i");
      delete_button.setAttribute("class","far fa-minus-square main_delete title clickable");
      delete_button.setAttribute("id","delete_"+id);
      delete_button.setAttribute("onclick","delete_main_activity_box(this)")
      title.appendChild(delete_button);
      title.appendChild(edit);
      divtitle.appendChild(title);
      main_parent_element.replaceChild(divtitle,input_parent);

    }
    $.post( "../PHP/main_activity_add.php", { main_id: id, main_activity: input_value, action:action, project_id:window.project_id} );

  }
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
    var sdate_div = document.createElement('div');
    sdate_div.setAttribute("class","sub_activity_sdate sub")
    var sdate_title = document.createElement("h3");
    sdate_title.setAttribute("class","sdate_title");
    sdate_title.innerHTML="Start Date";
    sdate_div.appendChild(sdate_title);
    /* Add Title for End Date */
    var edate_div = document.createElement('div');
    edate_div.setAttribute("class","sub_activity_edate sub")
    var edate_title = document.createElement("h3");
    edate_title.setAttribute("class","edate_title");
    edate_title.innerHTML="End Date";
    edate_div.appendChild(edate_title);

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
    three_week_ahead(bdate_dates,bdate_days);
    bdate.appendChild(bdate_dates);
    bdate.appendChild(bdate_days);

    /* Add edit to the Activity Location */
    var edit_div = document.createElement('div');
    edit_div.setAttribute("class","sub_activity_edit collapsable sub")
    var edit_empty_title = document.createElement("div");
    edit_empty_title.setAttribute("class","edit_icon");
    edit_div.appendChild(edit_empty_title);

    // Adds Delete Icon ///
    var delete_div = document.createElement('div');
    delete_div.setAttribute("class","sub_activity_delete collapsable sub")
    var delete_empty_title = document.createElement("div");
    delete_empty_title.setAttribute("class","delete_icon");
    delete_div.appendChild(delete_empty_title);

    return [id_div, name_div, sdate_div, edate_div, duration_div,contractor_div, bdate, edit_div, activity_div, delete_div];

  }
////////////////////////////////////////////////////////////////////
function download_sub_activity(main_id,sub_id,activity_title,start_date,end_date,duration,party_involved, dates){
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
   var input_sdate = document.createElement("h5");
   input_sdate.setAttribute("class","sub_sdate sub_activity_"+id.toString());
   input_sdate.setAttribute("id","sdate_"+id.toString());
   input_sdate.setAttribute("value",start_date);
   input_sdate.setAttribute('onclick','input_edit(this)')
   input_sdate.innerHTML = date_format_changer(start_date);

   /* Create End Date */
   var input_edate = document.createElement("h5");
   input_edate.setAttribute("class","sub_edate sub_activity_"+id.toString());
   input_edate.setAttribute("id","edate_"+id.toString());
   input_edate.setAttribute("value",end_date)
   input_edate.setAttribute('onclick','input_edit(this)')
   input_edate.innerHTML = date_format_changer(end_date);

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

   var edit = document.createElement("i");
   edit.setAttribute("class","fas fa-edit edit_sub_icon clickable sub_activity_"+id.toString());
   edit.setAttribute("id","edit_"+id);
   edit.setAttribute("onclick","update_sub_activity(this)")
   
   var delete_button= document.createElement("i");
   delete_button.setAttribute("class","far fa-minus-square delete_sub_icon clickable sub_activity_"+id.toString());
   delete_button.setAttribute("id","delete_"+id);
   delete_button.setAttribute("onclick","delete_sub_activity_box(this)")

   /* Create Date Box */
   var bdate_box = document.createElement("div");
   bdate_box.setAttribute("class","sub_bdate sub_activity_"+id.toString());
   bdate_box.setAttribute("id","bdate_"+id);
   date_box(bdate_box,id,dates);

   var filled_divs = [p_id, input_activity,input_sdate,input_edate,input_duration,input_contractor, edit,bdate_box, delete_button];
    return filled_divs;
  }

  //////////////////////////////////////////////////////////////////////////////
/* Adds a sub Activity to the corresponding main activty*/
function add_sub_activity(this_tag){
  var parent_div=this_tag.parentElement;
  var parent_id=parent_div.id;
  if (parent_div.children.length < 3){
    empty_divs = create_all_sub_activity_divs();
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
      activity_div.appendChild(id_div);
      activity_div.appendChild(name_div);
      activity_div.appendChild(sdate_div);
      activity_div.appendChild(edate_div);
      activity_div.appendChild(duration_div);
      activity_div.appendChild(contractor_div);
      activity_div.appendChild(edit_div);
      activity_div.appendChild(delete_div);
      activity_div.appendChild(bdate);
      parent_div.appendChild(activity_div);
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
   var sdate_parent= parent_div.getElementsByClassName("sub_activity_sdate")[0];
   var input_sdate = document.createElement("input");
   input_sdate.setAttribute('type','text')
   input_sdate.setAttribute("class","sub_sdate sub_activity_"+id.toString());
   input_sdate.setAttribute("id","sdate_"+id.toString());
   input_sdate.setAttribute("onfocus","date_range_picker(this.id,'new')");
   input_sdate.setAttribute('value',date_format_changer2(date_standard_to_yyyy_mm_dd_format(new Date())))
   sdate_parent.appendChild(input_sdate);

   /* Create End Date */
   var edate_parent= parent_div.getElementsByClassName("sub_activity_edate")[0];
   var input_edate = document.createElement("input");
   input_edate.setAttribute('type','text')
   input_edate.setAttribute("class","sub_edate sub_activity_"+id.toString());
   input_edate.setAttribute("id","edate_"+id.toString());
   input_edate.setAttribute("onfocus","date_range_picker(this.id,'new')");
   input_edate.setAttribute('value',date_format_changer2(date_standard_to_yyyy_mm_dd_format(new Date())))
   edate_parent.appendChild(input_edate);

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
   var add_parent= parent_div.getElementsByClassName("sub_activity_edit")[0];
   var add = document.createElement("i");
   add.setAttribute("class","fas fa-check-square add_sub_icon clickable sub_activity_"+id.toString());
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

//////////////////////////////////////////////////////////////////////////////

function sdate_greater_edate(sdate, edate){
  //fix sdate>edate scenario
  var sdate_part = sdate.split("-");
  var edate_part = edate.split("-");
  if(parseInt(sdate_part[0])>parseInt(edate_part[0])){
    return [sdate,edate]
  }
  if(parseInt(sdate_part[0])==parseInt(edate_part[0])){
    if(parseInt(sdate_part[1])>parseInt(edate_part[1])){
      return [sdate,edate]
    }
    if(parseInt(sdate_part[1])==parseInt(edate_part[1])){
      if(parseInt(sdate_part[2])>parseInt(edate_part[2])){
        return [sdate,edate]
      }
    }
  }
  return [];
}
//////////////////////////////////////////////////////////////////////////////
//For Add Sub Activity HTML//

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
    //   duration = duration + 1;
    // }

    // date = date + 86400000;
    // if((date+3600000==e_date)){
    //   date = date+3600000
    // }
    // else if((date-3600000==e_date)){
    //   date = date-3600000
    // }
    // day = (new Date(date)).getDay();
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
    var end_date = yyyy+"-"+mm+"-"+dd;
    return end_date;

}
//////////////////////////////////////////////////////////////////////////////
$(document).on('change','.sub_duration', function(){
  var duration = this.value;
  var id = this.id.split("_")[1]
  var start_date_tag = document.getElementById("sdate_"+id)
  var start_date = start_date_tag.getAttribute('value')
  if(start_date == null){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    start_date_tag.setAttribute('value',today);
    start_date = start_date_tag.getAttribute('value')
  }

  var end_date = return_end_date(start_date,duration,holidays_date_array,weekend_value);
  document.getElementById("edate_"+id).setAttribute('value',end_date);
  document.getElementById("edate_"+id).innerHTML = date_format_changer(end_date)
  

  // var id=document.getElementById("main_id").innerHTML;
  // var date_all = document.getElementById("bdate_"+id).children;
  // for (var j = 0; j<date_all.length; j++){
  //   var date_j = date_all[j];
  //   date_j.style.backgroundColor = "white";
  //   if (check_if_no_work(date_j.id.split('_')[1],weekend_date_transform(weekend_value))==false){
  //     date_j.style.backgroundColor="gray";
  //   }
  // }
  var date_array = date_filler(start_date,end_date);
  log_dates_to_schedule(date_array,this,'update')

})
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
///Checks for Errors between the start date and end date box once the start date box is populated
///Checks for Errors between the start date and end date box once the end date box is populated
$(document).on('change ','.sub_edate', function(){
  var end_date = getAttribute('value');
  var id = this.id.split("_")[1]
  var start_date_tag = document.getElementById("sdate_"+id);
  if (start_date_tag.getAttribute('value')==null){
    start_date_tag.setAttribute('value',end_date);
    start_date_tag.innerHTML = date_format_changer(end_date)
  }

  date = sdate_greater_edate(start_date_tag.getAttribute('value'),end_date);

  if (date.length>1){
    start_date_tag.setAttribute('value',date[1]);
    start_date_tag.innerHTML = date_format_changer(date[1])
  }
  var duration_tag = document.getElementById("duration_"+id);
  var duration = return_duration(start_date_tag.getAttribute('value'),end_date,holidays_date_array,weekend_value);
  duration_tag.setAttribute('value',duration);
  duration_tag.innerHTML=duration

  //Fills In Cells corresponding to dates
  var date_all = document.getElementById("bdate_"+id).children;
  for (var j = 0; j<date_all.length; j++){
    var date_j = date_all[j];
    date_j.style.backgroundColor = "white";
    if (check_if_no_work(date_j.id.split('_')[1],weekend_date_transform(weekend_value))==false){
      date_j.style.backgroundColor="gray";
    }
  }
  var date_array = date_filler(start_date_tag.getAttribute('value'),end_date);
  log_dates_to_schedule(date_array,this.id.split('_')[1],'update')
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function get_duration(start_date,end_date,id){
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


$(document).on('change','.sub_sdate', function(){
  var start_date = this.value;
  var id = this.id.split("_")[1]
  var end_date_tag = document.getElementById("edate_"+id);

  if (end_date_tag.value==""){
    end_date_tag.setAttribute('value',start_date);
    end_date_tag.innerHTML = date_format_changer(start_date)
  }
  date = sdate_greater_edate(start_date,end_date_tag.getAttribute('value'));
  if (date.length>1){
    end_date_tag.setAttribute('value',date[0]);
    end_date_tag.innerHTML = date_format_changer(date[0])
  }
  var duration = return_duration(start_date,end_date_tag.getAttribute('value'),holidays_date_array,weekend_value);
  var duration_tag = document.getElementById("duration_"+id);
  duration_tag.setAttribute('value',duration);
  duration_tag.innerHTML = duration

  var date_all = document.getElementById("bdate_"+id).children;
  for (var j = 0; j<date_all.length; j++){
    var date_j = date_all[j];
    date_j.style.backgroundColor = "white";
    if (check_if_no_work(date_j.id.split('_')[1],weekend_date_transform(weekend_value))==false){
      date_j.style.backgroundColor="gray";
    }
  }
  var date_array = date_filler(start_date,end_date_tag.getAttribute('value'));
  log_dates_to_schedule(date_array,this.id.split('_')[1],'update')

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






////


/////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
function get_all_sub_tags_with_id(sub_id){
  //////This function gets all the sub tags with the sub id provided////
  id_tag = document.getElementById(sub_id);
  activity_tag = document.getElementById("name_"+sub_id);
  sdate_tag = document.getElementById("sdate_"+sub_id);
  edate_tag = document.getElementById("edate_"+sub_id);
  duration_tag = document.getElementById("duration_"+sub_id);
  party_involved_tag = document.getElementById("contractor_"+sub_id);
  edit_tag = document.getElementById("edit_"+sub_id);
  delete_tag = document.getElementById("delete_"+sub_id)
  bdate_tag = document.getElementById("bdate_"+sub_id);
  return [id_tag,activity_tag,sdate_tag,edate_tag,duration_tag,party_involved_tag,edit_tag,delete_tag,bdate_tag]
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
  
  var action = document.getElementsByClassName("box")[0].getAttribute("name");
  var id = document.getElementById("main_id").innerHTML; ////this should be in the respective format ex id = 1001 for sub_id id=1 for main id/////
  var delete_button_parent = document.getElementById('delete_'+id).parentElement;

  if (action == 'delete_sub_activity'){
  ///Removes the deleted sub Activity////
  var sub_tags_array = get_all_sub_tags_with_id(id);
  if (delete_button_parent.children.length==2){
    for(var i = 0;i<sub_tags_array.length;i++){
      sub_tags_array[i].parentElement.remove();
  }
}
  else {   
    
    for(var i = 0;i<sub_tags_array.length;i++){
      sub_tags_array[i].remove();
      };

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

function add_title(){
  document.getElementById("search_bar_title").innerHTML += " Schedule";
}

function search_activity() { 
  let input = document.getElementById('searchbar').value;
  input=input.toLowerCase(); 
  let x = document.getElementsByClassName('main_activity_title'); 
  let y = document.getElementsByClassName('sub_name'); 
  let sdate = document.getElementsByClassName('sub_sdate'); 
  let edate = document.getElementsByClassName('sub_edate'); 
  let contractor = document.getElementsByClassName('sub_contractor');
  /*for (i = 0; i < x.length; i++) {  
  } */
  if(input==""){
    for(var l=0;l<x.length;l++){
      x[l].parentElement.style.display="inline-block";
    }
    for (var m = 0; m < y.length; m++){
        y[m].parentElement.parentElement.parentElement.style.display="inline-block";
        var split = y[m].id.split("_")[1];
        var row = document.getElementsByClassName("sub_activity_"+split);
        for (var k3=0;k3<row.length;k3++){
          row[k3].style.display = "";
        }
    }
  }
  else{
    for (var i = 0; i < x.length; i++) {  
      if (!x[i].childNodes[0].textContent.toLowerCase().includes(input)) { 
          x[i].parentElement.style.display="none"; 
          for (var j = 0; j < y.length; j++){
            if (y[j].textContent.toLowerCase().includes(input)||
                sdate[j].textContent.includes(input)||
                edate[j].textContent.includes(input)||
                contractor[j].textContent.toLowerCase().includes(input)){
              var split = y[j].id.split("_")[1];
              y[j].parentElement.parentElement.parentElement.style.display="inline-block"; 
              var row = document.getElementsByClassName(" sub_activity_"+split);
              for (var p=0;p<row.length;p++){
                row[p].style.display = "";
              }
            }
            else{
              if(!y[j].parentElement.parentElement.parentElement.childNodes[0].childNodes[0].textContent.toLowerCase().includes(input)){
                var split = y[j].id.split("_")[1];
                var row = document.getElementsByClassName("sub_activity_"+split);
                for (var k=0;k<row.length;k++){
                  row[k].style.display = "none";
                }
              }
              else{
                var split = y[j].id.split("_")[1];
                var row = document.getElementsByClassName("sub_activity_"+split);
                for (var k2=0;k2<row.length;k2++){
                  row[k2].style.display = "";
                }
              }
            }
          }
      } 
      else { 
          x[i].parentElement.style.display="inline-block";                  
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
  var sdate_div = parent_div.getElementsByClassName('sub_activity_sdate')[0]
  var edate_div = parent_div.getElementsByClassName('sub_activity_edate')[0]
  if (action == 'active'){
    collapse_button.setAttribute('type','hidden');
    activities_div.setAttribute('class','activity_left collapsed')
    name_div.setAttribute('class','sub_activity_name sub collapsed')
    sdate_div.setAttribute('class','sub_activity_sdate sub collapsed')
    edate_div.setAttribute('class','sub_activity_edate sub collapsed')
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
    sdate_div.setAttribute('class','sub_activity_sdate sub')
    edate_div.setAttribute('class','sub_activity_edate sub')
    setTimeout(function (){
      for (var i =0; i<children_array.length;i++){
        children_array[i].style.display = 'inline-block'
    }},1050);
    // name_div.style.width = '45%'
    // sdate_div.style.width='10%'
    // edate_div.style.width='10%'
  }
   
}