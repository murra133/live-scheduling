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

function did(id_){
  return document.getElementById(id_)
}

function create_delete_box(id,delete_item){
  ////id->id of item to be deleted, ////delete_item-> either "sub" or "main" depending of what is deleted
  ///Main Box
  let content_box = document.createElement('div');
  content_box.id = "delete_box";
  content_box.className = "box"
  ///Item being deleted
  let delete_box = document.createElement('h3');
  delete_box.id = "main_delete_item";
  ///All items affected->Only div is provided you must wirte the values
  // let affected_area = document.createElement('div');
  // affected_area.className = "area_affected";
  let delete_button = document.createElement('button');
  delete_button.className = "website_button";
  delete_button.innerHTML="Confirm"
  // let message = document.createElement('h6');
  // message.id = "message_box"


  if (delete_item == 'sub'){
    ///Removes the deleted sub Activity////
    delete_button.setAttribute("onclick","delete_selected_items("+id+",'delete_sub_activity')")
  }
  else if(delete_item=='main') {
    delete_button.setAttribute("onclick","delete_selected_items("+id+",'delete_main_activity')")
  }
  let cancel_button = document.createElement('button');
  cancel_button.setAttribute('onclick','cancel_box()')
  cancel_button.innerHTML = "Cancel"
  cancel_button.className = "website_button"
  let button_div = document.createElement('div')
  content_box.appendChild(delete_box);
  // content_box.appendChild(affected_area)
  button_div.appendChild(delete_button);
  button_div.appendChild(cancel_button);
  content_box.appendChild(button_div)
  return content_box;
}

function add_box_blur_background(box){
  //////Submit URL for page to load as if you were pulling it from the javascript Ex. "../HTML/add_sub_activity.html"////
  document.getElementById("main_page").style.blur = "10px";
  did('content_box').appendChild(box)
  $("#main_page").css({
    "-webkit-filter": "blur(3px)", 
    "-moz-filter": "blur(3px)", 
    "-o-filter": "blur(3px)", 
    "-ms-filter": "blur(3px)", 
    "filter": "blur(3px)", 
  }
);
return did("content_box");
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
  remove_error('error_'+parent_id)
  var sid = sub_id.id.split("_")[1]
  var array = ['name_','date_','contractor_','duration_','add_'];
  for(var i = 0; i<array.length;i++){
    all_sub_activities_to_h5(array[i]+sid)
  }
  var values_array = update_sub_activity(sid)
  var name = values_array[0]
  var date = values_array[1]
  // var edate = values_array[2]
  var duration = values_array[2]
  var party_involved = values_array[3]
  var sub_id = values_array[4];
  var action = values_array[5]
  let index = parseInt(did("sub_"+sid).getAttribute('data-index'));
  console.log(index)
  $.post( "../PHP/add_sub_activity.php",{ sub_id: parseInt(sid), main_id: parseInt(parent_id), sub_activity:name , date:date, duration:parseInt(duration), party_involved:party_involved, index:index, project_id:window.project_id} );
  var title = document.getElementById('title_'+parent_id);
  var r_opt = document.createElement('option')
  r_opt.setAttribute('value',sub_id+'-'+name)
  r_opt.setAttribute.innerHTML = title
  document.getElementById('datalistOptions').append(r_opt)
}
else{
  var parent_id = document.getElementById("name_"+sub_id).parentElement.parentElement.parentElement.parentElement.id
  remove_error('error_'+parent_id)
  var values_array = update_sub_activity(sub_id)
  var name = values_array[0]
  var date = values_array[1]
  var duration = values_array[2]
  var party_involved = values_array[3]
  var sub_id = values_array[4];
  var action = values_array[5]
  var actualized = values_array[6]
  $.post( "../PHP/update_sub_activity.php",{ sub_id: parseInt(sub_id), sub_activity:name , date:date, duration:parseInt(duration), party_involved:party_involved, project_id:window.project_id,actualized:actualized} );
  var r_opt = document.createElement('option')
  r_opt.setAttribute('value',sub_id+'-'+name)
  r_opt.setAttribute.innerHTML = title
  var data_array = document.getElementById('datalistOptions').children
  for (var i=0;i<data_array.length;i++){
    if (data_array[i].value.split('-')[0]==sub_id.toString()){
      data_array[i].replaceWith(r_opt)
      return
    }
  }
} 

}


function quicksort_jointlists(list_array,l,r){

  if(l==r-1||l==r){
    if(list_array[0][l]>list_array[0][r]){
      for(let k=0;k<n;k++){
        let temp = list_array[k][r]
        list_array[k][r]=list_array[k][l]
        list_array[k][r]=temp
      }
    }
    return list_array
  }
  //// List array is all joint lists inputted as an array with the value list on index 0////
  /// Example: [[position_array],[ids],[string]] innitiate left right as 0 and length of first list
  let n = list_array.length;
  let i = l+1;
  let j = r-1;
  let c=0

  while (i<j){
    if(list_array[0][i]>list_array[0][l]&&list_array[0][j]<list_array[0][l]){
        for(let k=0;k<n;k++){
          let temp = list_array[k][i]
          list_array[k][i]=list_array[k][j]
          list_array[k][j]=temp
        }
        j=j-1

      }
    else if (list_array[0][i]>=list_array[0][l]&&list_array[0][j]>=list_array[0][l]){
      j=j-1
    }
    else if(list_array[0][i]<=list_array[0][l]&&list_array[0][j]<=list_array[0][l]){
      i=i+1
    }
    else{
      i=i+1
      j=j-1
    }
  }
  if(list_array[0][i]>list_array[0][l]){
    i=i-1
  }
  for(let k=0;k<n;k++){
    let temp = list_array[k][i]
    list_array[k][i]=list_array[k][l]
    list_array[k][l]=temp
  }

  ///left////
  list_array = quicksort_jointlists(list_array,l,i)
  //right////
  list_array = quicksort_jointlists(list_array,i+1,r)

  return list_array


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

    var values_array = [activity_title,date,duration,party_involved,sub_id,action,actualized];
  return values_array
}
////////////////////////////////////////////////////////////////////////////
//fetch main activity
$( document ).ready(function() {
  window.project_id = cookie_value('project_id');
  window.register_id = cookie_value('Registry_ID');
  window.relationship_log = {};
  window.date_log={}
  window.rel_settings=0
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
                var main_div_array = []
                var main_div_position = []
                for (var i=0; i<Object.keys(js_data).length;i++){
                  /// Sets Variables///
                  var location = Object.keys(js_data)[i];
                  var main_id = js_data[location]["Main_ID"];
                  var main_title = js_data[main_id]['Main_Activity'];
                  /////Creates the Divs for the Main Title////
                  main_div_position.push(parseInt(js_data[main_id]["Position"]))
                  var divadd = create_main_activity(main_id,js_data[main_id]["Position"],main_title)
                  /////////////Create Sub Activities/////////////////////
                  var sub_activities_array = js_data[main_id]['sub_activity'];
                  ////////////////////////////// Create all the Empty Divs/////

                  var activity_div = create_title_sub_activity(main_id);
                  var date_div = activity_div.children[2]
                  var action_div = activity_div.children[0]
                  var collapsable_button = activity_div.children[1]
                  var bdate = date_div.children[0];
                  var dates = date_div.getElementsByClassName("cell_dates")[0];


                  let sub_position_array =[]
                  let sub_id_array = []
                  let sub_date_array = []

                  for (var j=0;j<Object.keys(sub_activities_array).length;j++){
                    //// Get All Sub Activities Variables////
                    // let subbox = activity_div.getElementsByClassName("sub_activity_box")[0]
                    action_div.getElementsByClassName('sub_title')[0].removeAttribute('style')
                    date_div.getElementsByClassName('sub_titles')[0].removeAttribute('style')
                    var sub_id = Object.keys(sub_activities_array)[j];
                    var sub_activity_title = sub_activities_array[sub_id]["Sub_Activity"];
                    var sub_dates = sub_activities_array[sub_id]["Date"];
                    var sub_duration = sub_activities_array[sub_id]["Duration"];
                    var sub_party_involved = sub_activities_array[sub_id]["Party_Involved"];
                    var sub_actualized = sub_activities_array[sub_id]["Actualized"]
                    var sub_position = sub_activities_array[sub_id]["Position"]
                    ////////// Adds Values to Sub Activity Box/////

                    var filled_divs = download_sub_activity2(main_id,sub_id,sub_activity_title,sub_dates,sub_duration,sub_party_involved,dates,sub_actualized)
                    var sub_bdate_div = filled_divs[1]
                    let sub_activity = filled_divs[0]
                    sub_activity.setAttribute('data-index',sub_position)
                    sub_activity = filter_start(sub_activity,sub_bdate_div)
                    var sub_start_date = date_format_changer3(sub_dates.split(" ")[0])
                    var sub_end_date = date_format_changer3(sub_dates.split(" ")[2])
                    var date_array = date_filler(sub_start_date, sub_end_date);
                    sub_bdate_div = log_dates_to_schedule(date_array,sub_bdate_div,"new")   
                    
                    window.date_log[sub_id]=sub_dates;
                    // bdate.appendChild(sub_bdate_div);
                    sub_position_array.push(parseInt(sub_position))
                    sub_id_array.push(sub_activity)
                    sub_date_array.push(sub_bdate_div)
                    // date_div.appendChild(bdate);
                    // action_div.appendChild(sub_activity)
                    var r_opt = document.createElement('option')
                    r_opt.setAttribute('value',sub_id+'-'+sub_activity_title)
                    r_opt.innerHTML = main_title
                    document.getElementById('datalistOptions').append(r_opt)

                    

                  }
                  let list_array = [sub_position_array,sub_id_array,sub_date_array]
                  list_array = quicksort_jointlists(list_array,0,list_array[0].length)
                  for(let i=0;i<list_array[0].length;i++){
                    bdate.appendChild(list_array[2][i]);
                    action_div.appendChild(list_array[1][i])
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
                  action_div.appendChild(error_div)
                  action_div.appendChild(subadd)
                  divadd.appendChild(activity_div);
                  main_div_array.push(divadd)
                  
                }

                let list_array = [main_div_position,main_div_array]
                list_array = quicksort_jointlists(list_array,0,list_array[0].length)
                for(let i=0;i<list_array[0].length;i++){
                  main_parent.appendChild(list_array[1][i]);
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

  let date_array = document.getElementsByClassName('date')
let day_array = document.getElementsByClassName('day')
for (let i=0; i<date_array.length;i++){
  let odate = date_array[i].innerHTML
  let oday = day_array[i].innerHTML
  let ndate_day =  change_dates_title(odate,oday)
  date_array[i].innerHTML = ndate_day[0]
  day_array[i].innerHTML = ndate_day[1]
}
window.holidays = {};
  $.ajax({
    url : '../PHP/pull_holidays.php',
    type : 'POST',
    data : 'project_id='+window.project_id,     
    success:function(data){
      var holidays_data = JSON.parse(data);
      // window.holiday_val = {}
      for (var h=0;h<Object.keys(holidays_data).length;h++){
        let dt = holidays_data[Object.keys(holidays_data)[h]][0]['HolidayDate']
        let hname = holidays_data[Object.keys(holidays_data)[h]][0]['HolidayName']
        let h_id = Object.keys(holidays_data)[h]
        window.holidays[dt] = {0:hname,1:h_id};
        // window.holiday_val[new Date(dt).getTime] = {0:hname,1:h_id};
      }
    }})
    
    $.ajax({
      url : '../PHP/pull_project_settings.php',
      type : 'POST',
      data : 'project_id='+window.project_id,     
      success:function(data){
        var settings = JSON.parse(data);
        weekend_value = settings['WorkWeek'];
        window.lookahead = settings['LookAhead'];
        window.sday = settings['Start_Day'];
        set_start_date()
      }})
      pull_relationship()
var project_name = cookie_value('project_name');
document.getElementById('main_title').innerHTML = project_name+" Schedule";

});
//////////////////////////////////////////////////////////////////////////////
function delete_main_activity_box(delete_icon_tag){
  var main_id= delete_icon_tag.id.split("_")[1];
  var main_activity = document.getElementById('title_'+main_id)
  var main_activity_title = main_activity.getAttribute('name')
  let content_box = create_delete_box(main_id,'main');
  content_box.children[0].innerHTML = "Please confirm we are to delete the following main activity: <br>"+main_activity_title;
  add_box_blur_background(content_box);
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
        input.setAttribute('id','party')
        var show_all = document.createElement('option')
        show_all.value='All'
        show_all.innerHTML='Show All'
        input.appendChild(show_all)
        input.value = 'All'
  }});

})

function error_message(message,id){
  document.getElementById(id).innerHTML = message
}

function remove_error(id){
  document.getElementById(id).innerHTML = ''
}
function date_range_picker(id_,action,value){
    var date_tag = document.getElementById(id_)
    var start_date = value.split(' ')[0]
    var end_date = value.split(' ')[2]

    $("#"+id_).daterangepicker({
      "startDate": start_date,
      "endDate": end_date,
      opens: 'center',
      "isInvalidDate" : function(date){
        if (window.date!=null){
          for(var ii = 0; ii < Object.keys(window.holidays).length; ii++){
            if (date.format('YYYY-MM-DD') == Object.keys(window.holidays)[ii]){
              return true;
            }
          }
        }
      }
    }, function(start, end, label) {
      get_duration(start.format("YYYY-MM-DD"),end.format("YYYY-MM-DD"),id_.split('_')[1])
      var dates_str = start.format("MM/DD/YYYY")+" - "+end.format("MM/DD/YYYY")
      window.date_log[id_.split('_')[1]]=dates_str
      date_tag.setAttribute('value',dates_str)
      date_tag.innerHTML = dates_str
      if(action=='update'){
        var datelog={}
        var array_answer = relationship_date(window.relationship_log,id_.split('_')[1],1,[id_.split('_')[1]],datelog)
        update_dates_rel(array_answer[1])
        field_edit(date_tag)
        console.log(document.getElementsByClassName("daterangepicker")[0])
    }

    })
  }

//////////////////////////////////////////////////////////////////////
function sub_undo(undo_tag){
  let id = undo_tag.id.split('_')[1];
  let sub = did('sub_'+id);
  let inputs = sub.querySelectorAll('input');
  let selects = sub.querySelectorAll('select')
  let h5;
  console.log("Running")

  ///Inputs
  inputs.forEach(input=>{
    h5 = document.createElement('h5')
    h5.className = input.className;
    h5.id = input.id;
    h5.innerHTML = input.getAttribute('name');
    if(h5.classList.contains('sub_date')){
      h5.setAttribute('onclick','input_edit(this)')
      h5.setAttribute('value',input.getAttribute('name'))
    }
    else{      
      h5.setAttribute('ondblclick','input_edit(this)')
    }
    input.replaceWith(h5)
  });
  ////Selects
  selects.forEach(input=>{
    h5 = document.createElement('h5')
    h5.className = input.className;
    h5.id = input.id;
    h5.innerHTML = input.getAttribute('name');
    if(h5.classList.contains('sub_date')){
      h5.setAttribute('onclick','input_edit(this)')
      h5.setAttribute('value',input.getAttribute('name'))
    }
    else{      
      h5.setAttribute('ondblclick','input_edit(this)')
    }
    input.replaceWith(h5)
  });


  let actualized_i = document.createElement('input');
  actualized_i.setAttribute('class','sub_actualized collapsable clickable');
  actualized_i.setAttribute('type','checkbox');
  actualized_i.setAttribute('id','actualized_'+id);
  undo_tag.replaceWith(actualized_i)
}

//////////////////////////////////////////////////////////////////////
function input_edit(input_tag){
  var id_ = input_tag.id;
  let sub_id = id_.split('_')[1]
  let sub = did("sub_"+sub_id)
  sub.setAttribute('draggable','false')
  sub.parentElement.parentElement.parentElement.setAttribute('draggable','false')
  var class_ = input_tag.getAttribute('class');
  var class_type = class_.split(' ')[0]
  var HTML = input_tag.innerHTML

  if (class_type == 'sub_name'){
    if (did('relationship_button').classList.contains('r_active')){
      if (did('relationship_title')!=undefined){
        did('relationship_input').value = input_tag.id.split('_')[1]+"-"+input_tag.innerHTML;
      }
      else(
        change_rel(input_tag.id.split('_')[1]+"-"+input_tag.innerHTML)
      )
      return
    }
    var input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('id',id_);
    input.setAttribute('class',class_);
    input.setAttribute('onChange','field_edit(this)')
    input.value = HTML;
    input.setAttribute('name',HTML)
    input_tag.replaceWith(input)
  }
  else if(class_type=='sub_date'){
    var input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('id',id_);
    input.setAttribute('class',class_);
    var value = input_tag.getAttribute('value')
    input.setAttribute('value',value);
    input_tag.replaceWith(input)
    input.setAttribute('name',HTML)
    date_range_picker(id_,'update',value)
  }
  else if(class_type == 'sub_duration'){
    var input = document.createElement('input');
    input.setAttribute('type','number');
    input.setAttribute('id',id_);
    input.setAttribute('class',class_);
    input.setAttribute('onChange','field_edit(this)')
    input.value = HTML
    input.setAttribute('name',HTML)
    input_tag.replaceWith(input)
  }
  else if(class_type == 'sub_contractor'){
    var input = window.party_list.cloneNode(true)
    input.setAttribute('id',id_);
    input.setAttribute('class',class_);
    input.setAttribute('onChange','field_edit(this)')
    input.value = HTML;
    input.setAttribute('name',HTML)
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

  //// Creates Undo to be replaced with actualized ///
  if (class_type.split('_')[0]=='sub'){
    let actualized_div = did('actualized_'+sub_id)
    let undo_i = document.createElement('i');
    undo_i.setAttribute('class','fas fa-undo-alt sub_undo collapsable clickable');
    undo_i.setAttribute('id','actualized_'+sub_id);
    undo_i.setAttribute('onclick','sub_undo(this)')
    actualized_div.replaceWith(undo_i)
  }
}

////////////////////////////////////////////
function all_sub_activities_to_h5(id_){
    var input_tag = document.getElementById(id_)
    var class_ = input_tag.getAttribute('class');
    var class_type = class_.split(' ')[0]
    var HTML = input_tag.value

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
    else if(class_type == "far"){
      var input = document.createElement('input');
      input.setAttribute("type","checkbox")
      input.setAttribute('class','sub_actualized sub_actualized_'+id_.split("_")[1]);
      input.setAttribute('id','actualized_'+id_.split("_")[1]);
      input_tag.replaceWith(input)

    }
}
//////////////////////////////////////////////////////////////////////
function field_edit(input_tag){
  var id_ = input_tag.id;
  ///
  let sub = did("sub_"+id_.split('_')[1])
  sub.setAttribute('draggable','true')
  sub.parentElement.parentElement.parentElement.setAttribute('draggable','true')
  var class_ = input_tag.getAttribute('class');
  var class_type = class_.split(' ')[0]
  var HTML = input_tag.value


  
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
    input.setAttribute('class','sub_date');
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
  if(sub.querySelectorAll("input").length==0 && sub.querySelectorAll("select").length==0){
    let undo_tag = did('actualized_'+id_.split('_')[1]);
    let actualized_i = document.createElement('input');
    actualized_i.setAttribute('class','sub_actualized collapsable clickable');
    actualized_i.setAttribute('type','checkbox');
    actualized_i.setAttribute('id','actualized_'+id_.split('_')[1]);
    undo_tag.replaceWith(actualized_i)
  }
  setTimeout(function(){
    upload_sub_activity(id_.split('_')[1])
  },500)
    /////Revert actualized /////

}
//////////////////////////////////////////////////////////////////////
/*Checks for today's date once the document loads and inputs it onto the start date div*/
function set_start_date(){
  ////Initialize for today////
    var today=new Date();
    var day = today.getDay()

    ////Start Monday///
    if(window.sday == 1){
      today = new Date(today.getTime()-(parseInt(day))*86400000)
    }
    ///Start Sunday///
    else if(window.sday == 2){
      today = new Date(today.getTime()-(parseInt(day)+1)*86400000)
    }
    ///Start on Saturday///
    else if(window.sday==3){
      today = new Date(today.getTime()-(parseInt(day)+2)*86400000)
    }

    ////Check if to start this week or the previous week///
    if(window.lookahead==1||window.lookahead==3){
      today = new Date(today.getTime()-(parseInt(day)-1)*86400000*-6)
    }
    else{
      today = new Date(today.getTime()-(parseInt(day)-1)*86400000)
    }
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
      for (let k=0;k<bdate_array[i].children.length;k++){
        if(k==0){
          var bdate_days = document.createElement("div");
          bdate_days.setAttribute("class","cell_days");
          var bdate_dates = document.createElement("div");
          bdate_dates.setAttribute("class","cell_dates");
          var title = document.createElement('div')
          title.setAttribute('class','sub_titles')
          bdate_dates, bdate_days = three_week_ahead(bdate_dates,bdate_days);
          title.appendChild(bdate_dates)
          title.appendChild(bdate_days)
          bdate_array[i].children[0].replaceWith(title)
        }
        else{
          let bdate_child =  bdate_array[i].children[k]
          let id_h = bdate_child.id
          let id_ = id_h.split('_')[1]
          var bdate_box = document.createElement("div");
          bdate_box.setAttribute("class","sub_bdate sub_activity_"+id_.toString());
          bdate_box.setAttribute("id","bdate_"+id_);
          bdate_box = date_box(bdate_box,id_,bdate_dates);
          bdate_child.replaceWith(bdate_box)
          var dates = document.getElementById('date_'+id_).getAttribute('value')
          var start_date = date_format_changer3(dates.split(" ")[0])
          var end_date = date_format_changer3(dates.split(" ")[2])
          date_array = date_filler(start_date,end_date)
          bdate_child = log_dates_to_schedule(date_array,bdate_box,'new')
        }
      }

      // var bdate_children = bdate_array[i].children
      // var length_ = bdate_children.length
      // var id_array =[]
      // for(var k=2;k<length_;k++){
      //   id_array.push(bdate_children[k].getAttribute('id').split("_")[1])
      // }
      // var id_
      // removeAllChildNodes(bdate_array[i])
      // bdate_array[i].appendChild(bdate_dates);
      // bdate_array[i].appendChild(bdate_days);
      // for(var k=0;k<length_-2;k++){
      //   id_ = id_array[k]
        
      // }



    }
  });
};


function filter_start(sub_activity,bdate){
  let filter_party = "1"
  let filter_date = ""
  if (filter_party =='1' && sub_activity.getElementsByClassName('sub_actualized')[0].checked){
    sub_activity.classList.add('filter-out')
    bdate.classList.add('filter-out')
  }
  else{
    sub_activity.classList.add('filter-in')
    bdate.classList.add('filter-in')

  }

  return sub_activity

}
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
  return_ = filter_parties(party,res_array,count)
  res_array=return_[0]
  count = return_[1]
  var m_activty = document.getElementsByClassName('main_activity')
  for (var i = 0; i< m_activty.length;i++){
    var parent_id = m_activty[i].id
    var parent_div = m_activty[i]
    var child_length = parent_div.getElementsByClassName('sub_id').length
    if (child_length == count[parent_id]){
      parent_div.classList.add('filter-out')
      parent_div.classList.remove('filter-in')

    }
    else{
      parent_div.classList.remove('filter-out')
      parent_div.classList.add('filter-in')


    }
  }
  toggle_filters()
}

function filter_parties(party,res_array,count){
  var sres_array = []
  for(var i=0;i<res_array.length;i++){
    var party_div = document.getElementById('contractor_'+res_array[i])
    var value = party_div.innerHTML
    var activity = document.getElementById('sub_'+res_array[i])
    if (value!=party&&party!='All'){
      var parent_id =party_div.parentElement.parentElement.parentElement.parentElement.id
      activity.classList.add('filter-out')
      did('bdate_'+res_array[i]).classList.add('filter-out')
      activity.classList.remove('filter-in')
      did('bdate_'+res_array[i]).classList.remove('filter-in')
      count[parent_id]++
      continue
    }
    sres_array.push(res_array[i])
    activity.classList.remove('filter-out')
    did('bdate_'+res_array[i]).classList.remove('filter-out')
    activity.classList.add('filter-in')
    did('bdate_'+res_array[i]).classList.add('filter-in')


  }
  return [sres_array,count]
}
function filter_status(status,res_array,count){
  var sres_array=[]
  for(var i=0;i<res_array.length;i++){
    var act_div = document.getElementById('actualized_'+res_array[i])
    var parent_id = act_div.parentElement.parentElement.parentElement.parentElement.id
    var activity = document.getElementById('sub_'+res_array[i])
    if (status==1&&act_div.checked == true){
      activity.classList.add('filter-out')
      did('bdate_'+res_array[i]).classList.add('filter-out')
      activity.classList.remove('filter-in')
      did('bdate_'+res_array[i]).classList.remove('filter-in')
      count[parent_id]++
      continue
    }
    else if(status==2&&act_div.checked == false){
      activity.classList.add('filter-out')
      did('bdate_'+res_array[i]).classList.add('filter-out')
      activity.classList.remove('filter-in')
      did('bdate_'+res_array[i]).classList.remove('filter-in')
      count[parent_id]++
      continue
    }
    else if((status==3)||(status==1&&act_div.checked==false)||(status==2&&act_div.checked==true)){
      activity.classList.remove('filter-out')
      did('bdate_'+res_array[i]).classList.remove('filter-out')
      activity.classList.add('filter-in')
      did('bdate_'+res_array[i]).classList.add('filter-in')
    }
    sres_array.push(res_array[i])
  }
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
    var activity= document.getElementById('sub_'+id_)
    if (v_end>=start_val&&v_start<=end_val){
      activity.classList.remove('filter-out')
      did('bdate_'+res_array[i]).classList.remove('filter-out')
      sres_array.push(id_)
    }
    else{
      activity.classList.add('filter-out')
      did('bdate_'+res_array[i]).classList.add('filter-out')
      var parent_id = date_array[i].parentElement.parentElement.parentElement.parentElement.id
      count[parent_id]++
    }
  }
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
  if (window.lookahead == '1'||window.lookahead=='2'){
    var m = 3
  }
  else{
    var m = 6
  }
  
  var n;
  var date = document.getElementById("start_date").value;

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
      let odate = nmm+'/'+ndd+'/'+nyy 
      date.innerHTML = nmm+'/'+ndd+'/'+nyy;
      var day_value = (standarize_dates_to_UTC(new Date(nyy+"-"+nmm+"-"+ndd))).getDay();
      var day = weekday_name(day_value);
      let ndate_day = change_dates_title(odate,day)
      var day_tag = document.createElement("h3");
      day_tag.setAttribute("class","day");
      day_tag.innerHTML =day;
      // date.innerHTML = ndate_day[0]
      // day_tag.innerHTML=ndate_day[1]
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
        if(date_array.indexOf(date)==0){
          if(date_array.length==1){
            id_handler.children[z].className ="date_box schedule schedule_single";
          }
          else{
            id_handler.children[z].className ="date_box schedule schedule_start";
          }
        }
        else if(date_array.indexOf(date)==date_array.length-1){
          id_handler.children[z].className ="date_box schedule schedule_end";
        }
        else{
          id_handler.children[z].className ="date_box schedule";
        }
      }
      if (window.holidays[date_format_changer3(date)]!=undefined){
        id_handler.children[z].className ="date_box holiday";
        id_handler.children[z].setAttribute('name',window.holidays[date_format_changer3(date)][0])
        id_handler.c
      }
      else if (check_if_no_work(date,weekend_date_transform(weekend_value))==false){

        id_handler.children[z].className ="date_box weekend";
      }

    }
    return id_handler


  }
  else if (action=='update'){
    var id = id_handler
    var date_id = document.getElementById("bdate_"+id);
    let date_all = date_id.getElementsByClassName('schedule')
    let j=0
    while (date_all.length>0){
      var dates = date_all[j]
      dates.className = 'date_box'
    }
    for(var i=0;i<date_array.length;i++){
      let date_box = document.getElementById(id+"_"+date_array[i])
      if(date_box!=null && (date_box.className!="date_box holiday" && date_box.className!="date_box weekend")){
        if (i==0){
          if (date_array.length==1){
            date_box.className = 'date_box schedule schedule_single'

          }
          else{
            date_box.className = 'date_box schedule schedule_start'
          }
        }
        else if(i==date_array.length-1){
          date_box.className = 'date_box schedule schedule_end'
        }
        else{
          date_box.className = 'date_box schedule'
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
      if (check_if_no_work(dates[i].innerHTML,weekend_date_transform(weekend_value))==false){
        box.setAttribute("class","date_box weekend");
      }
      else{
        box.setAttribute("class","date_box")
      }
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
  function date_format_changer4(date){
    ///input date value in seconds outputs mm/dd/yyyy
    date = new Date(date)
    dd = date.getDate()
    mm = date.getMonth()+1
    yyyy=date.getFullYear()
    if (dd<10){
      dd="0"+dd
    }
    if(mm<10){
      mm='0'+mm
    }
    return mm+"/"+dd+"/"+yyyy
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
    var formatted_date = yyyy+"-"+mm+"-"+dd
    return formatted_date

  }
  //////////////////////////////////////////////////////////////////////////////
  /*Creates Main Activity Div */
  function create_main_activity(id,index,html){
    main_activity = document.createElement('div');
    main_activity.setAttribute("id",id);
    main_activity.setAttribute('draggable',"true")
    main_activity.setAttribute('ondrag','main_draggables(this)')
    main_activity.setAttribute("class","main_activity");
    main_activity.setAttribute('data-index',index)
    // main_div_position.push(parseInt(js_data[main_id]["Position"]))
    var divtitle=document.createElement("div")
    divtitle.setAttribute("class","main_activity_title")
    var title = document.createElement("h2");
    title.setAttribute("name",html);
    title.innerHTML = html;
    title.setAttribute('class','title clickable');
    title.setAttribute('id','title_'+id)
    title.setAttribute('ondblclick','input_edit(this)')
    var delete_button= document.createElement("i");
    delete_button.setAttribute("class","far fa-minus-square main_delete title clickable");
    delete_button.setAttribute("id","delete_"+id);
    delete_button.setAttribute("onclick","delete_main_activity_box(this)")
    divtitle.appendChild(title);
    divtitle.appendChild(delete_button);
    main_activity.appendChild(divtitle)
    return(main_activity)

  }
  //////////////////////////////////////////////////////////////////////////////
/* Adds the Main Activity Line */
  function add_main_activity(){
    var add_cell = document.getElementById('added_cell');
    var n =add_cell.children.length;
    ////Creates unique ID and runs div creation////
    $.ajax({
      url : "../PHP/create_id.php",
      type : 'POST',
      data:{id: 0, project_id: window.project_id, action:'mainid'},
      success:function(data){
        n = JSON.parse(data)
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
        add_cell.appendChild(div)
      }
    })
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
    let index = document.getElementsByClassName('main_activity').length
    var main_parent_element = add_tag.parentElement.parentElement;
    var input_parent= add_tag.parentElement;
    var input_value= input_parent.children[0].value;
    var id=main_parent_element.id;
    var action = 'add_main_activity'
    // var main_div=input_parent.parentElement;
    let main_div = create_main_activity(id,index,input_value)
    // main_div.setAttribute('draggable','true')
    // main_div.setAttribute('ondrag','main_draggables(this)')
    // main_div.setAttribute('data-index',index)
    let sub_activity = create_title_sub_activity(id)
    let subadd = sub_activity.getElementsByClassName('activity_left')[0]
    subadd = create_sub_action(subadd,id)
    
    // var divtitle = document.createElement('div')
    // divtitle.setAttribute('class','main_activity_title')
    // var input = document.createElement('h2');
    // input.setAttribute('class','title clickable');
    // input.setAttribute('id','title_'+id);
    // input.setAttribute('onClick','input_edit(this)')
    // input.setAttribute('name',input_value)
    // input.innerHTML = input_value;
    // var delete_button= document.createElement("i");
    // delete_button.setAttribute("class","far fa-minus-square main_delete title clickable");
    // delete_button.setAttribute("id","delete_"+id);
    // delete_button.setAttribute("onclick","delete_main_activity_box(this)")
    // divtitle.appendChild(input)
    // divtitle.appendChild(delete_button)
    // removeAllChildNodes(main_parent_element)
    // main_parent_element.appendChild(divtitle);
    // main_parent_element.appendChild(sub_activity);
    main_div.appendChild(sub_activity)
    main_parent_element.replaceWith(main_div)
    console.log(id,input_value)
    $.post( "../PHP/main_activity_add.php", { main_id: id, main_activity: input_value, action:action, project_id:window.project_id,index:index} );
  };

//////////////////////////////////////////////////////////////////////////////

  function add_id_to_box(id_array){
    document.getElementById("main_id").innerHTML=id_array[0];
      document.getElementById("main_id").setAttribute("name",id_array[1]+"_"+(parseInt(id_array[0])-parseInt(id_array[1])*1000));
      document.getElementsByClassName("box")[0].setAttribute("name",id_array[2]);
  }

  //////////////////////////////////////////////////////////////////////////////

  function create_title_sub_activity(main_id){
    var activity_div=document.createElement('div');
    activity_div.setAttribute("class","sub_activity_box");
    activity_div.setAttribute('id','subbox_'+main_id)
    /* Activity Right*/
    var date_div = document.createElement('div');
    date_div.setAttribute('class','activity_right');
    /* Activity Left*/
    var action_div = document.createElement('div');
    action_div.setAttribute('class','activity_left')
    /* Collapse Button*/
    var collapsable_button = document.createElement('div')
    collapsable_button.setAttribute('class','collapsable_button')
    var c_button = document.createElement('i')
    c_button.setAttribute('class','fa fa-angle-left clickable')
    c_button.setAttribute('onclick','collapse_activities(this)')
    c_button.setAttribute('type','active')
    c_button.setAttribute('id','collapse_'+main_id)
    collapsable_button.appendChild(c_button)
    /* Sub Activity Title */
    var s_activity_div=document.createElement('div');
    s_activity_div.setAttribute("class","sub_activity sub_title");
    s_activity_div.setAttribute("style","display:none");
    s_activity_div.setAttribute('data-index',0)
    /* Add Title for ID */
    var id_title = document.createElement("h3");
    id_title.setAttribute("class","sub_id_title sub id_title");
    id_title.innerHTML="Id";
    s_activity_div.appendChild(id_title);
    /* Add Title for Activity */
    var name_title = document.createElement("h3");
    name_title.setAttribute("class","sub_name_title sub activity_title");
    name_title.innerHTML="Activity";
    s_activity_div.appendChild(name_title);
    /* Add Title for Start Date */
    var date_title = document.createElement("h3");
    date_title.setAttribute("class","sub_date_title sub date_title");
    date_title.innerHTML="Dates";
    s_activity_div.appendChild(date_title);

    /* Add Duration */
    var duration_title = document.createElement("h3");
    duration_title.setAttribute("class","sub_duration_title collapsable");
    duration_title.innerHTML="Duration";
    s_activity_div.appendChild(duration_title);

    /* Add Party Invloved */
    var contractor_title = document.createElement("h3");
    contractor_title.setAttribute("class","sub_contractor_title collapsable");
    contractor_title.innerHTML="Party Involved";
    s_activity_div.appendChild(contractor_title);

    /* Add Dates to the Activity Location */
    var bdate = document.createElement('div');
    bdate.setAttribute("class","sub_activity_bdate sub")
    var bdate_div= document.createElement('div')
    bdate_div.setAttribute('class','sub_titles')
    bdate_div.setAttribute("style","display:none");
    var bdate_days = document.createElement("div");
    bdate_days.setAttribute("class","cell_days");
    var bdate_dates = document.createElement("div");
    bdate_dates.setAttribute("class","cell_dates");
    bdate_dates,bdate_days= three_week_ahead(bdate_dates,bdate_days);
    bdate_div.appendChild(bdate_dates);
    bdate_div.appendChild(bdate_days);
    bdate.appendChild(bdate_div)

    /* Add edit to the Activity Location */
    var actualized_title = document.createElement("h3");
    actualized_title.setAttribute("class","sub_actualized_title collapsable");
    actualized_title.innerHTML = "A"
    s_activity_div.appendChild(actualized_title);

    // Adds Delete Icon ///s
    var delete_empty_title = document.createElement("div");
    delete_empty_title.setAttribute("class","delete_icon sub_delete_title collapsable");
    s_activity_div.appendChild(delete_empty_title);
    action_div.appendChild(s_activity_div)
    date_div.appendChild(bdate)

    activity_div.appendChild(action_div)
    activity_div.appendChild(collapsable_button)
    activity_div.appendChild(date_div)

    return activity_div;
  }

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
    var bdate_div= document.createElement('div')
    bdate_div.setAttribute('class','sub_titles')
    var bdate_days = document.createElement("div");
    bdate_days.setAttribute("class","cell_days");
    var bdate_dates = document.createElement("div");
    bdate_dates.setAttribute("class","cell_dates");
    bdate_dates,bdate_days= three_week_ahead(bdate_dates,bdate_days);
    bdate_div.appendChild(bdate_dates);
    bdate_div.appendChild(bdate_days);
    bdate.appendChild(bdate_div)

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
function download_sub_activity2(main_id,sub_id,activity_title,date,duration,party_involved, dates,actualized){
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
  input_activity.setAttribute("class","sub_name sub");
  input_activity.setAttribute("id","name_"+id.toString());
  input_activity.setAttribute('onclick','input_edit(this)')
  input_activity.innerHTML=activity_title;

   /* Create Date */
   var input_date = document.createElement("h5");
   input_date.setAttribute("class","sub_date sub");
   input_date.setAttribute("id","date_"+id.toString());
   input_date.setAttribute("value",date);
   input_date.setAttribute('onclick','input_edit(this)')
   input_date.innerHTML = date;

   //Create Duration//
   var input_duration = document.createElement("h5");
   input_duration.setAttribute("class","sub_duration sub collapsable");
   input_duration.setAttribute("id","duration_"+id.toString());
   input_duration.setAttribute('onclick','input_edit(this)')
   input_duration.innerHTML = duration;

     /* Create Contartcor Option */
   var input_contractor = document.createElement("h5");
   input_contractor.setAttribute("class","sub_contractor sub collapsable");
   input_contractor.setAttribute("id","contractor_"+id.toString());
   input_contractor.setAttribute('onclick','input_edit(this)')
   input_contractor.innerHTML = party_involved
  //Sub_Activity Div
  let sub_activity = document.createElement('div')
  sub_activity.setAttribute('id','sub_'+id)
  sub_activity.setAttribute('draggable','true')
  sub_activity.setAttribute('ondrag','sub_draggables(this)')

    /* Create Date Box */
   var bdate_box = document.createElement("div");
   bdate_box.setAttribute("id","bdate_"+id);
   date_box(bdate_box,id,dates);

  // Actualized
   var input_actualized = document.createElement("input");
   input_actualized.setAttribute("type","checkbox")
   input_actualized.setAttribute("class","sub_actualized collapsable");
   input_actualized.setAttribute("id","actualized_"+id.toString());
   if(actualized==1){
     input_actualized.checked = true;
     sub_activity.setAttribute('class','sub_activity sub_activity_actualized')
     bdate_box.setAttribute("class","sub_bdate bdate_actualized");
   }
   else{
    sub_activity.setAttribute('class','sub_activity')
    bdate_box.setAttribute("class","sub_bdate");

   }
   
   var delete_button= document.createElement("i");
   delete_button.setAttribute("class","far fa-minus-square delete_sub_icon clickable collapsable");
   delete_button.setAttribute("id","delete_"+id);
   delete_button.setAttribute("onclick","delete_sub_activity_box(this)")



  sub_activity.appendChild(p_id)
  sub_activity.appendChild(input_activity)
  sub_activity.appendChild(input_date)
  sub_activity.appendChild(input_duration)
  sub_activity.appendChild(input_contractor)
  sub_activity.appendChild(input_actualized)
  sub_activity.appendChild(delete_button)
  return [sub_activity,bdate_box];
}


function create_sub_action(activity_left,id){
  ////Creates the add sub_activity box, error box, and any miscellaneous boxes needed///
  var error_div = document.createElement('div')
  error_div.setAttribute('class','error_div')
  var error_message = document.createElement('h6')
  error_message.setAttribute('id','error_'+id)
  error_message.setAttribute('class','error_message')
  error_div.appendChild(error_message)
  var subadd=document.createElement('div');
  subadd.setAttribute("class","sub_activity_add clickable");
  subadd.setAttribute("onclick","add_sub_activity(this)");
  var subaddtwo=document.createElement("i");
  subaddtwo.setAttribute("class","far fa-plus-square add_sub_activity_button");
  subaddtwo.innerHTML="   Add Sub Activity";
  subadd.appendChild(subaddtwo);
  activity_left.appendChild(error_div)
  activity_left.appendChild(subadd)
  return activity_left
}

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
  input_activity.setAttribute('ondclick','input_edit(this)')
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
function check_for_active_inputs(main_div){
  /*This function ensures that all inputs are submitted prior to starting a new activty*/
var main_id = main_div.id
var sub_array = main_div.getElementsByClassName('sub_activity')
if(sub_array[1]!=null){
  for(var i=1;i<sub_array.length;i++){
    if(sub_array[i].getElementsByTagName('input')[1]!=null){
      var message = "Error All Values Must Be Submitted Prior To starting New Activty"
      error_message(message,'error_'+main_id)
      return false
    }
  }
}
return true

}

  //////////////////////////////////////////////////////////////////////////////
/* Adds a sub Activity to the corresponding main activty*/

function add_sub_activity(this_tag){

  var parent_div=this_tag.parentElement.parentElement.parentElement;
  let add_clone = this_tag.cloneNode(true)
  if (check_for_active_inputs(parent_div)==false){
    return
  }
  else{
    var parent_div=this_tag.parentElement.parentElement.parentElement;
    let parent = this_tag.parentElement
    var parent_id=parent_div.id;
    parent_div.setAttribute('draggable','false')
    let subbox = did("subbox_"+parent_id)
    subbox.getElementsByClassName('sub_title')[0].removeAttribute('style')
    subbox.getElementsByClassName('sub_titles')[0].removeAttribute('style')

    remove_error('error_'+parent_id)
    if (parent.children.length < 3){
      var activity_div = create_title_sub_activity(parent_id) 
      this_tag.replaceWith(activity_div)
    }




    /* Add Id to sub activity number */

    $.ajax({
      url : "../PHP/create_id.php",
      type : 'POST',
      data:{id: parent_id, project_id: window.project_id, action:'subid'},
      success:function(data){
        id = JSON.parse(data)
        let activity_left = document.getElementById('subbox_'+parent_id).children[0]

        let sub_activity = document.createElement('div')
        sub_activity.setAttribute('class','sub_activity filter-in')
        sub_activity.setAttribute('id','sub_'+id)
        sub_activity.setAttribute('ondrag','sub_draggables(this)');
        sub_activity.setAttribute('draggable','true');
        let index = this_tag.parentElement.querySelectorAll('.sub_activity').length;
        sub_activity.setAttribute('data-index',index)
        /*  Create ID */
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
        sub_activity.appendChild(p_id);
    
        /* Create Activity */
        var input_activity = document.createElement("input");
        input_activity.setAttribute('type','text')
        input_activity.setAttribute("class","sub_name");
        input_activity.setAttribute("id","name_"+id.toString());
        sub_activity.appendChild(input_activity);
    
        /* Create Start Date */
        var input_date = document.createElement("input");
        input_date.setAttribute('type','text')
        input_date.setAttribute("class","sub_date");
        input_date.setAttribute("id","date_"+id.toString());
        input_date.setAttribute("onfocus","date_range_picker(this.id,'new',this.value)");
        var today_ = date_format_changer2(date_standard_to_yyyy_mm_dd_format(new Date()))
        input_date.setAttribute('value',today_+" - "+today_)
        sub_activity.appendChild(input_date);
    
        //Create Duration//
        var input_duration = document.createElement("input");
        input_duration.setAttribute('type','number')
        input_duration.setAttribute("class","sub_duration collapsable");
        input_duration.setAttribute("id","duration_"+id.toString());
        input_duration.value=1
        sub_activity.appendChild(input_duration);
    
          /* Create Contartcor Option */
        var input_contractor = window.party_list.cloneNode(true)
        input_contractor.setAttribute("class","sub_contractor collapsable");
        input_contractor.setAttribute("id","contractor_"+id.toString());
        sub_activity.appendChild(input_contractor);
    
        //// Create Add Button////
        var add = document.createElement("i");
        add.setAttribute("class","far fa-plus-square add_sub_icon sub_actualized clickable collapsable");
        add.setAttribute("id","add_"+id);
        add.setAttribute("onclick","upload_sub_activity(this,'add')")
        sub_activity.appendChild(add);
    
        ////Create Delete Button/////
        var delete_button= document.createElement("i");
        delete_button.setAttribute("class","far fa-minus-square delete_sub_icon clickable collapsable");
        delete_button.setAttribute("id","delete_"+id);
        delete_button.setAttribute("onclick","delete_sub_activity_box(this)");
        sub_activity.appendChild(delete_button);
    
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
        let error_div = activity_left.getElementsByClassName('error_div')[0].cloneNode(true)
        activity_left.getElementsByClassName('error_div')[0].replaceWith(sub_activity)
        activity_left.getElementsByClassName('sub_activity_add')[0].replaceWith(error_div)
        activity_left.appendChild(add_clone)
      }
    })
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
    else if((date-3600000==e_date)){
      date = date-3600000
      continue
    }
    let date_n = date_format_changer3(date_format_changer4(date))
    if(weekend.indexOf(day)>=0||holidays_array[date_n]!=undefined){
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

function return_end_date(start_date, duration, holidays, weekend_days){
    //Input is start_date in yyyy-mm-dd, duration in number of days, holidays_array in yyyy-mm-dd, weekend_days
    var day = (standarize_dates_to_UTC((new Date (start_date)))).getDay();
    var weekend = weekend_date_transform(weekend_days);
    var date = (new Date(start_date)).getTime();
    if(duration>0){
      var d = 1;
      while(d<parseInt(duration)){
        date = date+86400000;
        if(day==6){
          day=0
        }
        else{
          day = day+1
        }
        let date_n = date_format_changer3(date_format_changer4(date))
        if(weekend.indexOf(day)>=0||holidays[date_n]!=undefined){
        }
        else{
          d=d+1
        }
      }
    }
    else if(duration==0){
      return start_date
    }
    else{
      d=-1
      while(d>parseInt(duration)){
        date = date-86400000;
        if(day==0){
          day=6
        }
        else{
          day = day-1
        }
        let date_n = date_format_changer3(date_format_changer4(date))
        if(weekend.indexOf(day)>=0||holidays[date_n]!=undefined){
        }
        else{
          d=d-1
        }
      }
    }
    date = new Date(date)
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
  var end_date = return_end_date(start_date,duration,window.holidays,weekend_value);
  dates = start_date+" - "+end_date  
  window.date_log[id]=dates
  date_tag.setAttribute('value',dates)
  date_tag.innerHTML = dates
  var datelog={}
  var array_answer = relationship_date(window.relationship_log,id,1,[id],datelog)
  if(!(did("actualized_"+id)==undefined)){
    console.log(did("actualized_"+id));
    update_dates_rel(array_answer[1]) 
  }

  var date_array = date_filler(date_format_changer3(start_date),date_format_changer3(end_date));
  log_dates_to_schedule(date_array,id,'update')

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function get_duration(start_date,end_date,id){
  var duration = return_duration(start_date,end_date,window.holidays,weekend_value);
  var duration_tag = document.getElementById("duration_"+id);
  duration_tag.setAttribute('value',duration);
  duration_tag.value = duration
  duration_tag.innerHTML = duration
  var date_array = date_filler(start_date,end_date);
  log_dates_to_schedule(date_array,id,'update')
}

//////////////////////////////////////////////////////////////////////

$(document).on('change','.sub_actualized',function(){
  var id = this.getAttribute('id').split("_")[1]
  if (this.checked==true){
    this.parentElement.className='sub_activity sub_activity_actualized'
    document.getElementById('bdate_'+id).className='sub_bdate bdate_actualized'
  }
  else{
    this.parentElement.className='sub_activity'
    document.getElementById('bdate_'+id).className='sub_bdate'

  }
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
  let parent = delete_icon_tag.parentElement
  if(parent.getElementsByTagName('input').length>=3){
    parent.remove()
    return
  }

  var sub_id= parseInt(delete_icon_tag.id.split("_")[1]);
  // var sub_tags_array = get_all_sub_tags_with_id(sub_id);
  let values = get_all_sub_tags_with_id(sub_id);
  
  let content_box =create_delete_box(sub_id,'sub');
  let delete_box = content_box.children[0];
  delete_box.innerHTML = "Please confirm we are to delete the following activity:<br>"+values[1].innerHTML+"<br>"
  // delete_box.appendChild(values[1]);
  // let affected_area = content_box.children[1];
  // let predecessor_div = document.createElement("div");
  // predecessor_div.className = "rel_area";
  // let successor_div = document.createElement("div");
  // successor_div.className = "rel_area";
  // let predecessor_title = document.createElement('h3');
  // predecessor_title.innerHTML = "Predecessor - Activities";
  // let successor_title = document.createElement('h3');
  // successor_title.innerHTML = "Successor - Activities";
  // predecessor_div.appendChild(predecessor_title);
  // successor_div.appendChild(successor_title);
  // let div = document.createElement("h5")
  // if(window.relationship_log[sub_id]!=undefined){
  //   if(window.relationship_log[sub_id][0]!=undefined){
  //     for (let i in Object.keys(window.relationship_log[sub_id][0])){
  //       let pre = div.cloneNode(true);
  //       pre.innerHTML = did("name_"+window.relationship_log[sub_id][0][i]["sub_id"]).innerHTML;
  //       predecessor_div.appendChild(pre)
  //     }
  //   }
  //   if(window.relationship_log[sub_id][1]!=undefined){
  //     for (let i in Object.keys(window.relationship_log[sub_id][1])){
  //       let succ = div.cloneNode(true);
  //       succ.innerHTML = did("name_"+window.relationship_log[sub_id][1][i]["sub_id"]).innerHTML;
  //       successor_div.appendChild(succ)
  //     }
  //   }
  // }
  add_box_blur_background(content_box);
  




}

function delete_selected_items(delete_id,action){
  ////This function deletes any item that needs to be deleted. Input is the delete button. Use If statements to add other items to be deleted/////
  if (action == 'delete_sub_activity'){
  ///Removes the deleted sub Activity////
  let sub_act = document.getElementById('sub_'+delete_id)
  sub_act.remove()
}
else if(action=='delete_main_activity') {
  var main_activity_parent = document.getElementById(delete_id);
  main_activity_parent.remove();
}
  ////Delete Activity/////

  $.post( "../PHP/delete_activity.php",{ id: parseInt(delete_id), action:action,project_id:window.project_id} );
  var content_box = did('content_box');
  ///location.reload();
  pull_relationship();
  removeAllChildNodes(content_box);
$('#main_page').removeAttr('style');
return false;

}

function kmp_pre_proccess(string){
  let lps = [0]
  let pos = 0;
  for(let i =1;i<string.length;i++){
    if(string[i]==string[pos]){
      pos = 1+pos;
      lps.push(pos)
    }
    else{
      pos = 0;
      lps.push(pos)
    }
  }
  return lps
}

function kmp(string1,string_lps,string2){
  let len = string1.length;
  let pos=0;
  for (let i=0;i<string2.length;i++){
    if(string2[i]==string1[pos]){
      let k=i+1;
      for(var j=pos+1;j<len;j++){
        if(string1[j]==string2[k]){
          k=k+1;
        }
        else{
          pos=string_lps[j-1]
          j=len+5
        }
      }
      if(j==len){
        return true
      }
    }
  }
  return false
}

function search_activity(){
  let input = document.getElementById('searchbar').value;
  if(input==''){
    let search_out = document.querySelectorAll('.search-out')
    search_out.forEach(s => {
      s.classList.remove('search-out')
    })
    return
  }
  input = input.toLowerCase()
  let pre =kmp_pre_proccess(input)
  let main_title = document.getElementsByClassName('title')
  for(var i=0;i<main_title.length;i++){
    if(main_title[i].tagName=='I'){
      continue
    }
    var main_id = main_title[i].id.split("_")[1]
    let title = main_title[i].textContent.toLowerCase()
    if(kmp(input,pre,title)){
      var main_div = document.getElementById(main_id)
      main_div.classList.remove('search-out')
      continue
    }
    else{
      count = 0
      let p_sub = document.getElementById(main_id).querySelectorAll('.sub_activity.filter-in')
      for(var k=0;k<p_sub.length;k++){
        let activity = p_sub[k].getElementsByClassName('sub_name')[0].textContent.toLowerCase()
        let party =p_sub[k].getElementsByClassName('sub_contractor')[0].textContent.toLowerCase()

        let id_ = p_sub[k].id.split("_")[1]
        if(kmp(input,pre,activity)||kmp(input,pre,party)){
          p_sub[k].classList.remove('search-out')
          did('bdate_'+id_).classList.remove('search-out')
        }
        else{
          p_sub[k].classList.add('search-out')
          did('bdate_'+id_).classList.add('search-out')
          count++
        }
      }
      if(count==p_sub.length){
        did(main_id).classList.add('search-out')
      }
      else{
        did(main_id).classList.remove('search-out')
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

function hide_searchbar(body){
  if(document.documentElement.scrollTop>300 || document.body.scrollTop>300){
    did('search_navbar').className = "hide_nav"
    did('sidebar').setAttribute('style','display:none')
    did('filter_div').classList.remove('filter_active')
    did('topbar').classList.remove('navbar_active')

  }
  else{
    did('search_navbar').removeAttribute('class')
    did('sidebar').removeAttribute('style')
  }

}

function push_to_all(){
  $.post( "../PHP/push_to_all.php", { project_id:window.project_id});
}

function add_function_to_push(function_call){
  var search_tag =document.getElementById('push_all_button');
  search_tag.setAttribute('onclick',function_call);
}

function cancel_box(){
  var content_box = did("content_box");
  ///location.reload();
  removeAllChildNodes(content_box);
$('#main_page').removeAttr('style');
return false;

}


//////////////////////////////////////////////////////////////////////
function collapse_activities(collapse_button){
  // var action = collapse_button.getAttribute('type');
  // var id = collapse_button.getAttribute('id').split('_')[1];
  // var parent_div = document.getElementById(id);
  // var children_array = parent_div.getElementsByClassName('collapsable')
  // var activities_div = parent_div.getElementsByClassName('activity_left')[0];
  // var name_div = parent_div.getElementsByClassName('sub_name')
  // var date_div = parent_div.getElementsByClassName('sub_date')
  // var edate_div = parent_div.getElementsByClassName('sub_activity_edate')[0]
  let activities_div = document.getElementsByClassName('activity_left')
  let collapsed_buttons = document.getElementsByClassName('collapsable_button')
  if (activities_div[0].className.split(' ').length>1){
    var action = 'not_active'
  }
  else{
    var action='active'
  }
  let name_div = document.getElementsByClassName('sub_name')
  let date_div = document.getElementsByClassName('sub_date')
  let name_title = document.getElementsByClassName('sub_name_title')
  let children_array = document.getElementsByClassName('collapsable')
  if (action == 'active'){
    // collapse_button.setAttribute('type','hidden');
    for(var i =0; i<activities_div.length;i++){
      activities_div[i].setAttribute('class','activity_left collapsed')
      collapsed_buttons[i].children[0].className = "fa-solid fa-angle-left clickable rotate180"
  }
  for(var i =0; i<name_title.length;i++){
    name_title[i].setAttribute('class','sub_name_title sub activity_title collapsed')
}

    for(var i =0; i<name_div.length;i++){
        date_div[i].setAttribute('class','sub_date sub collapsed')
        name_div[i].setAttribute('class','sub_name sub collapsed')
    }
    for (var i =0; i<children_array.length;i++){
      children_array[i].style.display = 'none'
    }
  }
  else{
    // collapse_button.setAttribute('type','active');
    for(var i =0; i<activities_div.length;i++){
      activities_div[i].setAttribute('class','activity_left')
      collapsed_buttons[i].children[0].className = "fa-solid fa-angle-left clickable rotate0"

  }
  for(var i =0; i<name_title.length;i++){
    name_title[i].setAttribute('class','sub_name_title sub activity_title')
}
    for(var i =0; i<name_div.length;i++){
        date_div[i].setAttribute('class','sub_date sub')
        name_div[i].setAttribute('class','sub_name sub')
    }
    setTimeout(() => {
      for (var i =0; i<children_array.length;i++){
        children_array[i].removeAttribute('style')
      }
    }, 600);
  }
   
}

////////////////   Relationship   //////////////////////
function relationship_active(relationship_tag){
  var relationship_box = document.getElementById('relationship')
  if (relationship_tag.getAttribute('class').split(' ')[1]=='r_active'){
    relationship_tag.setAttribute('class','website_button')
    relationship_box.setAttribute('class','relationship')
    relationship_box.removeAttribute('style')
    relationship_tag.removeAttribute('style')
  }
  else{
    relationship_tag.setAttribute('class','website_button r_active')
    relationship_box.setAttribute('class','relationship r_active')
    update_rel_height()

  }
}

function update_rel_height(){
  var relationship_box = document.getElementById('relationship')
  var relationship_tag = document.getElementById('relationship_button')
  height = relationship_box.offsetHeight
  height_button = height+15
  relationship_box.setAttribute('style','top:calc(100% - '+height+'px);left:0%')
  relationship_tag.setAttribute('style','top:calc(100% - '+height_button+'px)')
}

function change_rel(new_rel){
  let sub_id = new_rel.split('-')[0];
  let title = new_rel.split('-')[1];
  let rel_title = did('relationship_top')
  removeAllChildNodes(rel_title);
  let h3 = document.createElement('h3');
  h3.id='rel_'+sub_id;
  h3.innerHTML = title;
  rel_title.appendChild(h3)
  let rel_area = document.querySelectorAll('.rel_area');
  let rel_sub_titles = rel_area[0].children[0].cloneNode(true)
  let rel_t2 = rel_sub_titles.cloneNode(true)
  console.log(rel_sub_titles)
  rel_area.forEach(rel=>{
    removeAllChildNodes(rel)
  });
  rel_area[0].appendChild(rel_sub_titles)
  rel_area[1].appendChild(rel_t2)
  did("relationship_apply").children[0].setAttribute('onclick','update_relationship_log('+sub_id+')')

  if(window.relationship_log[parseInt(sub_id)]!=null){
    for(let i in window.relationship_log[parseInt(sub_id)]){
      for(let k in window.relationship_log[parseInt(sub_id)][i]){
        add_predecessor_successor(i,k,sub_id)
      }

    }
  }

}

function create_relationship_area(sub_id){
  /////////Relationship Boxes////////////////////////////
  var activity_h5 = document.createElement('h5')
  activity_h5.innerHTML='Activity'
  activity_h5.setAttribute('class','rel_title rel_left')
  var relationship_h5 = document.createElement('h5')
  relationship_h5.innerHTML = 'Relationship'
  relationship_h5.setAttribute('class','rel_title rel_mid')
  var lag_h5 = document.createElement('h5')
  lag_h5.innerHTML = 'lag'
  lag_h5.setAttribute('class','rel_title rel_right')
  var undo_h5 = document.createElement('div')
  undo_h5.setAttribute('class','rel_title rel_delete_undo')
  var title_div = document.createElement('div')
  title_div.setAttribute('class','rel_row')
  title_div.appendChild(activity_h5)
  title_div.appendChild(relationship_h5)
  title_div.appendChild(lag_h5)
  title_div.appendChild(undo_h5)
  var relationship_area = document.createElement('div')
  relationship_area.setAttribute('class','rel_area')
  relationship_area.append(title_div)
  var relationship_area2 = relationship_area.cloneNode(true)
  ///////Prdecessor//////
  var div_pre = document.createElement('div')
  var pre_title = document.createElement('h4')
  pre_title.innerHTML = 'Predecessor'
  var add_pre = document.createElement('i')
  add_pre.setAttribute('class','far fa-plus-square clickable pre_suc')
  add_pre.setAttribute('onclick','add_predecessor_successor(0,0,'+sub_id+')')
  add_pre.innerHTML='Add Predecessor'
  div_pre.append(pre_title)
  div_pre.append(relationship_area2)
  div_pre.append(add_pre)
  /////Successor//////////////
  var div_suc = document.createElement('div')
  var suc_title = document.createElement('h4')
  suc_title.innerHTML = 'Successor'
  var add_suc = document.createElement('i')
  add_suc.setAttribute('class','far fa-plus-square clickable pre_suc')
  add_suc.setAttribute('onclick','add_predecessor_successor(1,0,'+sub_id+')')
  add_suc.innerHTML='Add Successor'
  div_suc.append(suc_title)
  div_suc.append(relationship_area)
  div_suc.append(add_suc)
  var rel_bot_div = document.getElementById('relationship_bottom')
  window.rel_data = rel_bot_div.children[1].cloneNode(true)
  removeAllChildNodes(rel_bot_div)
  rel_bot_div.append(div_pre)
  rel_bot_div.append(div_suc)
  rel_bot_div.append(window.rel_data)

}

function relationship_continue(continue_tag){
  var input = document.getElementById('relationship_input')
  var sub_id = input.value.split('-')[0]
  if (sub_id==''){
    let message = 'Activty Has Not Been Chosen'
    error_message(message,'rel_errormsg')
    update_rel_height()
    return
  }
  remove_error('rel_errormsg')
  var sub_activity = input.value.split('-')[1]
  document.getElementById('relationship_title').innerHTML=sub_activity
  document.getElementById('relationship_title').setAttribute('id','rel_'+sub_id)
  /////////Relationship Boxes////////////////////////////
  var activity_h5 = document.createElement('h5')
  activity_h5.innerHTML='Activity'
  activity_h5.setAttribute('class','rel_title rel_left')
  var relationship_h5 = document.createElement('h5')
  relationship_h5.innerHTML = 'Relationship'
  relationship_h5.setAttribute('class','rel_title rel_mid')
  var lag_h5 = document.createElement('h5')
  lag_h5.innerHTML = 'lag'
  lag_h5.setAttribute('class','rel_title rel_right')
  var undo_h5 = document.createElement('div')
  undo_h5.setAttribute('class','rel_title rel_delete_undo')
  var title_div = document.createElement('div')
  title_div.setAttribute('class','rel_row')
  title_div.appendChild(activity_h5)
  title_div.appendChild(relationship_h5)
  title_div.appendChild(lag_h5)
  title_div.appendChild(undo_h5)
  var relationship_area = document.createElement('div')
  relationship_area.setAttribute('class','rel_area')
  relationship_area.append(title_div)
  var relationship_area2 = relationship_area.cloneNode(true)
  /////// Existing Relationships//


  ///////Prdecessor//////
  var div_pre = document.createElement('div')
  var pre_title = document.createElement('h4')
  pre_title.innerHTML = 'Predecessor'
  var add_pre = document.createElement('i')
  add_pre.setAttribute('class','far fa-plus-square clickable pre_suc')
  add_pre.setAttribute('onclick','add_predecessor_successor(0,0,'+sub_id+')')
  add_pre.innerHTML='Add Predecessor'
  div_pre.append(pre_title)
  div_pre.append(relationship_area2)
  div_pre.append(add_pre)
  /////Successor//////////////
  var div_suc = document.createElement('div')
  var suc_title = document.createElement('h4')
  suc_title.innerHTML = 'Successor'
  var add_suc = document.createElement('i')
  add_suc.setAttribute('class','far fa-plus-square clickable pre_suc')
  add_suc.setAttribute('onclick','add_predecessor_successor(1,0,'+sub_id+')')
  add_suc.innerHTML='Add Successor'
  div_suc.append(suc_title)
  div_suc.append(relationship_area)
  div_suc.append(add_suc)
  var rel_bot_div = document.getElementById('relationship_bottom')
  window.rel_data = rel_bot_div.children[1].cloneNode(true)
  removeAllChildNodes(rel_bot_div)
  rel_bot_div.append(div_pre)
  rel_bot_div.append(div_suc)
  rel_bot_div.append(window.rel_data)

  ////Buttons////////////////
  var submit = document.createElement('button')
  submit.setAttribute('class','website_button clickable')
  submit.innerHTML = "Submit"
  submit.setAttribute('onclick','update_relationship_log('+sub_id+')')
  var cancel = document.createElement('button')
  cancel.setAttribute('class','website_button clickable')
  cancel.innerHTML = "Cancel"
  cancel.setAttribute('onclick','rel_cancel(1)')
  continue_tag.parentElement.append(cancel)
  continue_tag.replaceWith(submit)
  if(window.relationship_log[parseInt(sub_id)]!=null){
    for(let i in window.relationship_log[parseInt(sub_id)]){
      for(let k in window.relationship_log[parseInt(sub_id)][i]){
        add_predecessor_successor(i,k,sub_id)
      }

    }
  }


  ////////Update Relationship Box/////////////
  update_rel_height()
}

function rel_del_undo(action,undo_tag,loc,id){
  var rel_row = undo_tag.parentElement
  rel_row.className = 'rel_row rel-'+loc
  var activity = rel_row.children[0]
  var rel_inp = rel_row.children[1]
  var lag_inp = rel_row.children[2]
  if (rel_row.id==''){
    if(loc ==0){
      loc_a= 1
    }
    else{
      loc_a=0
    }
    rel_row.remove()
    return
  }
  else{
    var rel_id = rel_row.id.split('_')[1]
  }
  var child_id = window.relationship_log[id][loc][rel_id]['sub_id']
  var child = child_id+'-'+document.getElementById('name_'+child_id).innerHTML
  var rel = window.relationship_log[id][loc][rel_id]['Rel']
  var lag = window.relationship_log[id][loc][rel_id]['Lag']
  activity.value = child
  rel_inp.value = rel
  lag_inp.value = lag
  if(action=='Delete'){
    activity.className=activity.className+' rel_delete'
    rel_inp.className=rel_inp.className+' rel_delete'
    lag_inp.className=lag_inp.className+' rel_delete'
    undo_tag.className = 'fas fa-undo-alt rel_delete_undo clickable'
    undo_tag.setAttribute('onclick','rel_del_undo("Undo",this,'+loc+','+id+')')
  }
  else{
    activity.className='rel_left'
    rel_inp.className='rel_mid'
    lag_inp.className='rel_right'
    undo_tag.setAttribute('class','far fa-minus-square rel_delete_undo clickable')
    undo_tag.setAttribute('onclick','rel_del_undo("Delete",this,'+loc+','+id+')')
  }

}
function add_predecessor_successor(loc,relationship_id,id){
/////Takes inputs for box whether predecessor:0 or successor:1, relationship_id... 0 if none, and id of activity
  ///Activity////
  var activity = document.createElement('input')
  activity.setAttribute('list','datalistOptions')
  activity.setAttribute('class','rel_left')
  ///Relationship////
  var relationship = document.createElement('select')
  relationship.setAttribute('class','rel_mid')
  var fs = document.createElement('option')
  var sf = fs.cloneNode(true)
  var ff = fs.cloneNode(true)
  var ss = fs.cloneNode(true)
  fs.value=0
  fs.innerHTML = "Finsih Start"
  sf.value = 1
  sf.innerHTML = "Start Finish"
  ff.value = 2
  ff.innerHTML = "Finish Finish"
  ss.value = 3
  ss.innerHTML = "Start Start"
  relationship.append(fs,sf,ff,ss)
  ////Lag/////
  var lag = document.createElement('input')
  lag.setAttribute('class','rel_right')
  lag.setAttribute('type','number')
  var undo = document.createElement('i')
  undo.setAttribute('class','far fa-minus-square rel_delete_undo clickable')
  undo.setAttribute('onclick','rel_del_undo("Delete",this,'+loc+','+id+')')
  let row = document.createElement('div')
  row.setAttribute('class','rel_row')


  if(relationship_id!=0){
    let sub_id = window.relationship_log[id][loc][relationship_id]['sub_id']
    let rel_type = window.relationship_log[id][loc][relationship_id]['Rel']
    let lag_val = window.relationship_log[id][loc][relationship_id]['Lag']
    row.setAttribute('id','rel_'+relationship_id)
    activity.setAttribute('id','relact_'+sub_id)
    activity.value = sub_id+'-'+document.getElementById('name_'+sub_id).innerHTML
    lag.value = lag_val
    relationship.value = rel_type
  }
  else{

    lag.value=0
  }
  row.setAttribute('class','rel_row rel-'+loc)
  row.append(activity)
  row.append(relationship)
  row.append(lag)
  row.append(undo)
  var relationship_area = document.getElementsByClassName('rel_area')[loc]
  // var mid = document.getElementsByClassName('rel_mid')[loc]
  // var right = document.getElementsByClassName('rel_right')[loc]
  // left.append(activity)
  // mid.append(relationship)
  // right.append(lag)
  relationship_area.appendChild(row)
  // if (left.offsetHeight>250){
  //   var top = left.offsetHeight-230
  //   left.setAttribute('style','top:36px')
  //   mid.setAttribute('style','top:'+top+"px")
  //   right.setAttribute('style','top:'+top+"px")
  // }
  update_rel_height()
}

function rel_cancel(action){
  if (document.getElementsByClassName('rel_0')!=null & action==0){
  }
  let top = document.createElement('h3')
  top.id = 'relationship_title'
  top.innerHTML = "Choose an Activity"
  let datalist = document.getElementById('datalistOptions').cloneNode(true)
  let input = document.createElement('input')
  input.setAttribute('id','relationship_input')
  input.setAttribute('class','form-control')
  input.setAttribute('placeholder','Type to search...')
  input.setAttribute('list','datalistOptions')
  let apply = document.createElement('button')
  apply.setAttribute('class','website_button')
  apply.setAttribute('onclick','relationship_continue(this)')
  apply.innerHTML='Continue'
  let top_div = document.getElementById('relationship_top')
  let bot_div = document.getElementById('relationship_bottom')
  let button_div = document.getElementById('relationship_apply')
  removeAllChildNodes(top_div)
  removeAllChildNodes(bot_div)
  removeAllChildNodes(button_div)
  top_div.appendChild(top)
  bot_div.appendChild(input)
  bot_div.appendChild(datalist)
  button_div.appendChild(apply)
  remove_error('rel_errormsg')
  update_rel_height()

}

$(document).on('change','.rel_row',function(){
  this.className = this.className+' rel_change'
})

function update_relationship_log(id){
  id = id.toString()
  remove_error('rel_errormsg')
  let pre_array = document.getElementsByClassName('rel-0')
  let post_array = document.getElementsByClassName('rel-1')
  let dict=Object.assign({},window.relationship_log)
  if(dict[id]==undefined){
    dict[id]={0:{},1:{}}
  }
  else if(dict[id][0]==undefined){
    dict[id][0]={}
  }
  else if(dict[id][1]==undefined){
    dict[id][1]={}
  }
  var new_=0
  // dict[id]={0:{},1:{}}
  var pre_id_log = []
  var n_pre_id = []
  var post_id_log = []
  var delete_rel =''
  /////Pre Array//////
  for(var i=0;i<pre_array.length;i++){
        var pre_id = pre_array[i].children[0].value.split('-')[0].toString()
    if(pre_id==''){
      let message = 'All Input Fields must be Filled Prior to Submitting'
      error_message(message,'rel_errormsg')
      update_rel_height()
      return
    }
    else if(pre_id_log.includes(pre_id)){
      let message = "Input '"+pre_id+"' has been inputted twice"
      error_message(message,'rel_errormsg')
      update_rel_height()
      return
    }
    else{
      pre_id_log.push(pre_id)
      if(pre_array[i].id!=''){
        var rel_id = pre_array[i].id.split('_')[1]
        ////Delete Relationship///
        if(pre_array[i].children[0].className.split(' ')[1]=='rel_delete'){
          delete_rel=delete_rel+rel_id+';'
          continue
      }
    }
      else{
        var rel_id = 0
      }
      /// Add Pre Id to relationship Log if necessary /// 
      if (dict[pre_id]==undefined){
        dict[pre_id]={0:{},1:{}}
      }
      else if(dict[pre_id][1]==undefined){
        dict[pre_id][1]={}
      }
      var relationship = pre_array[i].children[1].value
      var lag = pre_array[i].children[2].value
      if (rel_id==0 & new_==0){
        n_pre_id.push(pre_id)
        dict[id][0][0]=[{'sub_id':pre_id,'Rel':relationship,'Lag':lag}]
        dict[pre_id][1][-2]=[{'sub_id':id,'Rel':relationship,'Lag':lag}]
        new_=new_+1
      }
      else if(rel_id==0 & new_!=0){
        dict[id][0][0].push({'sub_id':pre_id,'Rel':relationship,'Lag':lag})
        dict[pre_id][1][-2] = {'sub_id':id,'Rel':relationship,'Lag':lag}
        n_pre_id.push(pre_id)

      }
      else{
        dict[id][0][rel_id]={'sub_id':pre_id,'Rel':relationship,'Lag':lag}
        dict[pre_id][1][rel_id] = {'sub_id':id,'Rel':relationship,'Lag':lag}
      }
    }
  }

  /////Post Array///////
  var new_=0
  var new_d =0
  for(var i=0;i<post_array.length;i++){
    var post_id = post_array[i].children[0].value.split('-')[0].toString()
    if(post_id==''){
      let message = 'All Input Fields must be Filled Prior to Submitting'
      error_message(message,'rel_errormsg')
      update_rel_height()
      return
    }
    else if(post_id_log.includes(post_id)){
      let message = "Input '"+post_id+"' has been inputted twice"
      error_message(message,'rel_errormsg')
      update_rel_height()
      return
    }
    else{
      post_id_log.push(post_id)
      if(post_array[i].id!=''){
        var rel_id = post_array[i].id.split('_')[1]
      }
      else{
        var rel_id = 0
      }
      if (dict[post_id]==undefined){
        dict[post_id]={0:{},1:{}}
      }
      else if(dict[post_id][0]==undefined){
        dict[post_id][0]={}
      }
      var relationship = post_array[i].children[1].value
      var lag = post_array[i].children[2].value
      if (rel_id==0 & new_==0){
        dict[id][1][0]=[{'sub_id':post_id,'Rel':relationship,'Lag':lag}]
        dict[post_id][0][0]=[{'sub_id':id,'Rel':relationship,'Lag':lag}]
        new_=new_+1
      }
      else if(rel_id==0 & new_!=0){
        dict[id][1][0].push({'sub_id':post_id,'Rel':relationship,'Lag':lag})
        dict[post_id][0][0]=[{'sub_id':id,'Rel':relationship,'Lag':lag}]
      }
      else if(post_array[i].children[0].className.split(' ')[1]=='rel_delete'){
        if(new_d == 0){
          delete_rel=delete_rel+rel_id+';'
          dict[id][1][-1] = {}
          dict[id][1][-1][rel_id]={'sub_id':post_id,'Rel':relationship,'Lag':lag} 
          delete dict[post_id][0][rel_id]
          delete dict[id][1][rel_id]
          new_d = 1
        }
        else{
          delete_rel=delete_rel+rel_id+';'
          dict[id][1][-1][rel_id]={'sub_id':post_id,'Rel':relationship,'Lag':lag}
          delete dict[post_id][0][rel_id]
          delete dict[id][1][rel_id]
        }
      }
      else{
        dict[id][1][rel_id]={'sub_id':post_id,'Rel':relationship,'Lag':lag}
        dict[[post_id]][0][rel_id]={'sub_id':id,'Rel':relationship,'Lag':lag}
      }
    }

  }
  var datelog = {}
  console.log("dict")
  console.log(dict);
  var array_answer = relationship_date(dict,id,1,[id],datelog)
  // for(let i =0;i<n_pre_id.length;i++){
  //   console.log(n_pre_id[i])
  //   if (Object.keys(window.relationship_log[n_pre_id[i]][1]).length==1){
  //     delete window.relationship_log[n_pre_id[i]][1]
  //   }
  //   else{
  //     delete window.relationship_log[n_pre_id[i]][1][-2]
  //   }

  // }
  if (array_answer[0]=="Error"||array_answer[0]=="Erro"){
    error_message(array_answer[1],'rel_errormsg')
    return
  }

  else{
    ///Deleting at Server/////
    $.post( "../PHP/delete_relationship.php", { project_id:window.project_id,rel_id:delete_rel});
   update_dates_rel(array_answer[1])
    ////Update Relationship////
    var rel_id = ""
    var relationship = ""
    var post_id = ""
    var pre_id = ""
    var lag=""


    for(var z in Object.keys(dict[id])){
      loc = dict[id][z]
      for(var k in Object.keys(loc)){
        n = Object.keys(loc)[k]
        i=loc[n]
        if (n==0){
          for(var g in Object.keys(i)){
            rel_id = rel_id+'0;'
            relationship=relationship+i[g]['Rel']+';'
            lag = lag+i[g]['Lag']+';'
            if (z==0){
              post_id = post_id+id+';'
              pre_id=pre_id+(i[g]['sub_id'])+';'
            }
            else{
              post_id = post_id+(i[g]['sub_id'])+';'
              pre_id = pre_id+(id)+';'
            }
          }
        }
        else{
          rel_id = rel_id+n+';'
          relationship=relationship+i['Rel']+';'
          lag = lag+i['Lag']+';'
            if (z==0){
              post_id = post_id+id+';'
              pre_id=pre_id+(i['sub_id'])+';'
            }
            else{
              post_id = post_id+(i['sub_id'])+';'
              pre_id = pre_id+(id)+';'
            }
          }
        }
      }
    }
    $.ajax({
      url : "../PHP/add_relationship.php",
      type : 'POST',
      data:{rel_id: rel_id, project_id: window.project_id, relationship:relationship ,parent_id:pre_id, child_id:post_id,lag:lag},
      success:function(data){
        $.ajax({
          url : "../PHP/pull_relationship.php",
          type : 'POST',
          data:'project_id='+window.project_id,
          success:function(data){
            var rel_data = JSON.parse(data)
            for (let key in rel_data){
              window.relationship_log[key]=rel_data[key]
            }
            var rel_area = document.getElementsByClassName('rel_area')
            var rel_title = rel_area[0].children[0]
            var rel_title2 = rel_title.cloneNode(true)
            removeAllChildNodes(rel_area[0])
            removeAllChildNodes(rel_area[1])
            rel_area[0].appendChild(rel_title)
            rel_area[1].appendChild(rel_title2)
            for(let i in window.relationship_log[parseInt(id)]){
              for(let k in window.relationship_log[parseInt(id)][i]){
                if(k==-1){
                  continue
                }
                add_predecessor_successor(i,k,id)
              }
            }
            console.log(relationship_log)
          }
        })

      }
    })
    }

function pull_relationship(){
  $.ajax({
    url : "../PHP/pull_relationship.php",
    type : 'POST',
    data:'project_id='+window.project_id,
    success:function(data){
      var rel_data = JSON.parse(data)
      for (let key in rel_data){
        window.relationship_log[key]=rel_data[key]
      }
      console.log(relationship_log)
    }
  })
}

function update_dates_rel(date_changes){
  let doc = []
  for(var z in Object.keys(date_changes)){
    var sub_id = Object.keys(date_changes)[z]
    if(document.getElementById('actualized_'+sub_id).checked == false){
      ////update Date/////
      let date = date_changes[sub_id]
      window.date_log[sub_id]=date
      let doc_date = document.getElementById('date_'+sub_id)
      doc.push(doc_date)
      doc_date.setAttribute('class','sub_date sub_changed')
      doc_date.innerHTML = date
      doc_date.setAttribute('value',date)
      date_log[sub_id]=date
      upload_sub_activity(sub_id,'update')
      let date_array = date_filler(date_format_changer3(date.split(' ')[0]),date_format_changer3(date.split(' ')[2]))
      log_dates_to_schedule(date_array,sub_id,'update')
      window.date_log[sub_id] = date_changes[sub_id];
      // doc_date.setAttribute('class','sub_date')
    }
  }
  setTimeout(() => {
    for (let k=0;k<doc.length;k++){
      doc[k].setAttribute('class','sub_date')
    }
  }, 500);

}
function calculate_max_sdate(pre_id,post_id,rel_dict,datelog){
  var lag = rel_dict['Lag']
  var relationship = rel_dict['Rel']
  // console.log(pre_id)
  // console.log(window.relationship_log)
  if (datelog[pre_id]!=undefined&&datelog[pre_id]!=0){
    var dates = datelog[pre_id]
  }
  else{
    var dates = window.date_log[pre_id]
  }
  // console.log("dates= "+dates)
  var sdate = dates.split(' ')[0]
  var edate = dates.split(' ')[2]
  var duration = parseInt(document.getElementById('duration_'+post_id).innerHTML)
  var new_sdate = relationship_sdate(sdate,edate,relationship,lag,duration)

  return new Date(new_sdate).getTime()

}

function days_skipped(sdate,edate,weekend_days,holidays_array){
  var day = (new Date(sdate)).getDay();
  var weekend = weekend_date_transform(weekend_days);
  var sdate = (new Date(sdate)).getTime()
  var edate = (new Date(edate)).getTime()
  var skipped_days = 0
  while(sdate<edate){
    sdate = sdate+86400000;
    if(day==6){
      day=0
    }
    else{
      day = day+1
    }
    if(weekend[0] == day || weekend[1]==day){
      skipped_days=skipped_days+1
    }
      }
      return skipped_days
}
  

function relationship_date(id_rel_dict,sub_id,need_prdecessor,original_id,datelog){
  if(id_rel_dict[sub_id]==undefined){
    datelog[sub_id] = window.date_log[sub_id]
    return [undefined,datelog]
  }
  if (document.getElementById('actualized_'+sub_id).checked == true){
    return [original_id,datelog]
  }
  ///input id_rel_dict: dictionary of current id where calculations are to be made, sub_id: id tied to id_rel_dict need predecessor: 1 for need to calculate from predecessor 0 for no need
  ///original_id: id where all relationship calculations stem for, carrying date log of all changes///
  //////Predecessor/////////////////
  if(need_prdecessor==1 & id_rel_dict[sub_id][0]!=undefined){
    if(datelog[sub_id]==null & window.rel_settings==1){
      datelog[sub_id]==window.date_log[sub_id]
      var og_sdate = new Date(datelog[sub_id].split(' ')[0]).getTime()
      var new_sdate = 0
    }
    else if(datelog[sub_id]==null & window.rel_settings==0){
      datelog[sub_id]=0
      var og_sdate = 0
      var new_sdate = 0
    }
    else{
      datelog[sub_id]=0
      var og_sdate = 0
      var new_sdate = 0
    }
    
    for(var z in Object.keys(id_rel_dict[sub_id][0])){
      var i = Object.keys(id_rel_dict[sub_id][0])[z]
      //////New Predecessor/////////////
      if (i==0){
        // console.log("new line")
        // console.log(id_rel_dict)
        for(var k in Object.keys(id_rel_dict[sub_id][0][0])){
          let loc = id_rel_dict[sub_id][0][0]
          var pre_id = loc[k]['sub_id']
          if(datelog[pre_id]==null){
            datelog[pre_id]==window.date_log[pre_id]
          }
          
          new_sdate = Math.max(calculate_max_sdate(pre_id,sub_id,loc[k],datelog),new_sdate)
        }
      }
      /////////Existing Predecessor//////
      else{
        
        let loc = id_rel_dict[sub_id][0][i]
        var pre_id = loc['sub_id']
        // console.log("existing line")
        // console.log(loc)
        // console.log(pre_id)

        new_sdate = Math.max(calculate_max_sdate(pre_id,sub_id,loc,datelog),new_sdate)

      }
    }
    if (og_sdate<new_sdate){
      new_sdate = date_format_changer4(new_sdate)
      var duration = parseInt(document.getElementById('duration_'+sub_id).innerHTML)
      var new_edate = return_end_date(new_sdate,duration,window.holidays,weekend_value)
      datelog[sub_id] =new_sdate+" - "+new_edate
    }
    if (datelog[sub_id]==0){
      datelog[sub_id]=window.date_log[sub_id]
    }

      }
/////Successor///////////////
  if (id_rel_dict[sub_id]==undefined || !(1 in id_rel_dict[sub_id])){
    return [original_id,datelog]
    }

  if(datelog[sub_id]==null || datelog[sub_id]==0){
    datelog[sub_id]=window.date_log[sub_id]
  }
  for(var z in Object.keys(id_rel_dict[sub_id][1])){
    var post_loc = id_rel_dict[sub_id][1]
    var i = Object.keys(post_loc)[z]
    //// New Successor or Delete Successor/////////
    if (i==0 || i==-1){
      for(var k in post_loc[i]){
        let loc = post_loc[i][k]
        let post_id = loc['sub_id']
        if (original_id.indexOf(post_id.toString())>-1 ){
          let message = "Relationship Loop Created: "
          for(let z=0;z<original_id.length;z++){
            var name = document.getElementById('name_'+original_id[z]).innerHTML
            message = message+name+" => "
          }
          var name = document.getElementById('name_'+post_id).innerHTML
          message = message+name
          return ["Error",message]
        }
        ///Delete///
        if (i==-1){
            // var dict_k = window.relationship_log[post_id]
            // delete dict_k[0][k]
            // var dict_n = {}
            // dict_n[post_id]=dict_k
            var array_answer = relationship_date(id_rel_dict,post_id,1,original_id,datelog)
            original_id = array_answer[0]
            datelog=array_answer[1]
            original_id=original_id.slice(0,-1)
            if (array_answer[0]=="Error"){
              return array_answer
            }
            
          

        
        }
        ///ADD///
        else{
          var array_answer = successor_relationship(sub_id,post_id,loc,datelog,original_id,id_rel_dict)
          if (array_answer[0]=="Error"){
            return array_answer
          }
          original_id = array_answer[0]
          datelog=array_answer[1]
          original_id=original_id.slice(0,-1)
        }


      }
    }
    ///Existing Successor////////
    else{
      let loc = post_loc[i]
      let post_id = loc['sub_id']
      if (original_id.indexOf(post_id.toString())>-1 ){
        let message = "Relationship Loop Created: "
        for(let z=0;z<original_id.length;z++){
          var name = document.getElementById('name_'+original_id[z]).innerHTML
          message = message+name+" => "
        }
        var name = document.getElementById('name_'+post_id).innerHTML
        message = message+name
        return ["Error",message]
      }
      var array_answer = successor_relationship(sub_id,post_id,loc,datelog,original_id,id_rel_dict)
      if (array_answer[0]=="Error"){
        return array_answer
      }
      original_id = array_answer[0]
      datelog=array_answer[1]
      original_id=original_id.slice(0,-1)
      
  }
}
return [original_id,datelog]
}

function successor_relationship(sub_id,post_id,loc,datelog,original_id,dict){
    array_answer = relationship_date(dict,post_id,1,original_id,datelog)
    if (array_answer[0]=="Error"){
      return array_answer
    }
    original_id=original_id.slice(0,-1)
    datelog = array_answer[1]
    return [original_id,datelog]
  }
//   return [original_id,datelog]
// }

function relationship_sdate(sdate,edate,relationship,lag,duration){
  lag=parseInt(lag)+1
    ///relationship must equal FS,SF,SS,FF, lag must be numeric interger, 
    ///dates to be inputted in mm/dd/yyyy and be from the predecessor, duration is for the successor.
    if (relationship == 0){//SF
      return return_end_date(edate,lag,window.holidays,weekend_value)
    }
    else if (relationship == 3){//SS
      return return_end_date(sdate,lag,window.holidays,weekend_value)
    }
    else if (relationship == 1){//SF
      var finish_date = return_end_date(sdate,lag,window.holidays,weekend_value)
      return return_end_date(finish_date,duration*-1,window.holidays,weekend_value)
    }
    else if (relationship == 2){//FF
      var finish_date = return_end_date(edate,lag,window.holidays,weekend_value)
      return return_end_date(finish_date,duration*-1,window.holidays,weekend_value)
    }
  }
function convert_to_FS(relationship,lag,parent_sdate, parent_edate,child_duration,skipped_days){
  ///relationship must equal FS,SF,SS,FF, lag must be numeric interger, dates to be inputted in mm/dd/yyyy.
  var sdate = new Date(parent_sdate);
  var edate = new Date(parent_edate);
  var diff = sdate.getTime()-edate.getTime();
  var date_diff = diff/(1000*3600*24)+1;
  if (relationship == 0){
    return parseInt(lag)+1
  }
  else if (relationship == 3){
    new_lag = parseInt(lag)+date_diff;
    return new_lag
  }
  else if (relationship == 1){
    new_lag = (parseInt(lag)-parseInt(child_duration)+date_diff);
    return new_lag
  }
  else if (relationship == 2){
    new_lag = parseInt(lag)-parseInt(child_duration)+1;
    return new_lag
  }
}

function change_dates_title(date,day){
  ////   date ////
  date = date.split('/')
  date = date[0]+"/"+date[1]
  /// Day ///
  if(day=="Monday"){
    day="Mon"
  }
  else if(day=="Tuesday"){
    day="Tues"
  }
  else if(day=="Wednesday"){
    day="Wed"
  }
  else if(day=="Thursday"){
    day="Thur"
  }
  else if(day=="Firday"){
    day="Fri"
  }
  else if(day=="Saturday"){
    day="Sat"
  }
  else if(day=="Sunday"){
    day="Sun"
  }
  return [date,day]
}
function print_PDF(){
  let timestamp = document.createElement('h5')
  timestamp.setAttribute('id','time_stamp')
  timestamp.innerHTML=new Date()
  let p_body = document.getElementById('added_cell').cloneNode(true)
  p_body.className="PDF"
  let title = did('main_title').cloneNode(true)
  let date_array = p_body.getElementsByClassName('date')
  let day_array = p_body.getElementsByClassName('day')
  for (let i=0; i<date_array.length;i++){
    let odate = date_array[i].innerHTML
    let oday = day_array[i].innerHTML
    let ndate_day =  change_dates_title(odate,oday)
    date_array[i].innerHTML = ndate_day[0]
    day_array[i].innerHTML = ndate_day[1]
  }
  let schedule = document.createElement('div');
  schedule.append(title)
  schedule.append(timestamp)
  schedule.append(p_body)
  var opt = {
    margin: 0.5,
    filename: 'schedule.pdf',
    image: {type:'jpeg',quality:1},
    pagebreak:{avoid:'.main_activity'},
    html2canvas: {scale:2},
    jsPDF: {unit:"in", format:"ledger",orientation:"landscape",precision:"12"}
  }


  html2pdf().set(opt).from(schedule).toPdf().save();
}

function swap_sub_activities(start,end,sid,eid){
  if (sdragstartIndex==-1){
    return
  }
  let id_e = eid.split('_')[1]
  let id_s = sid.split('_')[1]
  start = parseInt(start)
  end = parseInt(end)
  let parent_clone = did(sid).parentElement.cloneNode(true)
  let children_ = parent_clone.children
  let bdate = did('bdate_'+id_e).parentElement.children
  let indexes = []
  let ordered_list_c =[]
  let ordered_list_d = []
  // linked_list_c[0] = chilren_[0]
  // linked_list_d[0]=bdate[0]
  let error = children_[children_.length-2];
  let add_sub_activity = children_[children_.length-1]
  ///Place values in an onordered list////
  for(let i =0;i<children_.length-2;i++){
    console.log("HERE")

    let c_index = parseInt(children_[i].getAttribute('data-index'));
    if (c_index!=start){
      if (start<end){
          if(end==c_index){
            console.log("HERE")
            indexes.push(c_index)
            ordered_list_c.push(did(sid).cloneNode(true))
            ordered_list_d.push(did('bdate_'+id_s).cloneNode(true))
            indexes.push(c_index-1)
            ordered_list_c.push(children_[i].cloneNode(true))
            ordered_list_d.push(bdate[i].cloneNode(true))
          }
          else if(c_index<start||c_index>end){
            indexes.push(c_index)
            ordered_list_c.push(children_[i].cloneNode(true))
            ordered_list_d.push(bdate[i].cloneNode(true))
        }
        else if(c_index>start&&c_index<end){
          indexes.push(c_index-1)
          ordered_list_c.push(children_[i].cloneNode(true))
          ordered_list_d.push(bdate[i].cloneNode(true))
        }
      }
      else{
        if(end==c_index){
          indexes.push(c_index+1)
          ordered_list_c.push(did(sid).cloneNode(true))
          ordered_list_d.push(did('bdate_'+id_s).cloneNode(true))
          indexes.push(c_index)
          ordered_list_c.push(children_[i].cloneNode(true))
          ordered_list_d.push(bdate[i].cloneNode(true))
        }
        else if(c_index<end||c_index>start){
          indexes.push(c_index)
          ordered_list_c.push(children_[i].cloneNode(true))
          ordered_list_d.push(bdate[i].cloneNode(true))
      }
        else if(c_index>end){
          indexes.push(c_index+1)
          ordered_list_c.push(children_[i].cloneNode(true))
          ordered_list_d.push(bdate[i].cloneNode(true))
        }
      }
    }
  }

  let datep= did('bdate_'+id_s).parentElement
  let parent = did(sid).parentElement
  removeAllChildNodes(parent)
  removeAllChildNodes(datep)
  let id_array = []
  let pos_array = []
  let sort_array = [indexes,ordered_list_c,ordered_list_d];
  console.log(sort_array)
  sort_array = quicksort_jointlists(sort_array,0,sort_array[0].length)
  ordered_list_c = sort_array[1]
  ordered_list_d = sort_array[2]
  for(let i=0;i<ordered_list_c.length;i++){
    ordered_list_c[i].setAttribute('data-index',i)
    parent.appendChild(ordered_list_c[i])
    datep.appendChild(ordered_list_d[i])
    if(i!=0){
      id_array.push(ordered_list_c[i].id.split('_')[1])
      pos_array.push(i)
    }
  }
  parent.appendChild(error)
  parent.appendChild(add_sub_activity)
  id_array = id_array.join()
  pos_array = pos_array.join()

  $.post( "../PHP/update_single_subitem.php",{ project_id:window.project_id, action:"position", sub_item:pos_array, sub_id:id_array} );

  
}


var sdragstartIndex = -1;
var sdragstartid = -1;
var dragging = 0;


////// Sub Activities //////
function dragStart_sub(){
  sdragstartIndex = this.getAttribute('data-index')
  // this.classList.add('sub_drag_over')
  // let childs = this.querySelectorAll('.sub');
  // childs.forEach(child_ =>{
  //   child_.setAttribute('style','pointer-events:none')})
}

function dragDrop_sub(){
  this.classList.remove('sub_drag_over')
  mdragstartIndex = -1
  let childs = this.querySelectorAll('.sub');
  let main_div = this.parentElement
  let draggables = main_div.querySelectorAll('.sub_activity');
  draggables.forEach(draggable => {
      draggable.removeEventListener('drop',dragDrop_sub);
      draggable.removeEventListener('dragover',dragOver_sub);
      draggable.removeEventListener('dragenter',dragEnter_sub);
      draggable.removeEventListener('dragleave',dragLeave_sub);

  })
  childs.forEach(child_ =>{
    child_.removeAttribute('style')})

  let sdragendindex = this.getAttribute('data-index')
  let sdragendid = this.id
  swap_sub_activities(sdragstartIndex,sdragendindex,sdragstartid,sdragendid)
  dragging = 0
  }

function dragEnter_sub(){
  this.classList.add('sub_drag_over')
  let childs = this.querySelectorAll('.sub');
  childs.forEach(child_ =>{
    child_.setAttribute('style','pointer-events:none')})
 }

function dragLeave_sub(){
  this.classList.remove('sub_drag_over')
  let childs = this.querySelectorAll('.sub');
  childs.forEach(child_ =>{
    child_.removeAttribute('style')})
}

function dragOver_sub(e){
  e.preventDefault()

}


function sub_draggables(drag){
  dragging = 'sub'
  sdragstartIndex = drag.getAttribute('data-index')
  sdragstartid = drag.id
  let main_div = drag.parentElement
  let draggables = main_div.querySelectorAll('.sub_activity');
  drag.addEventListener('dragstart',dragStart_sub)
  draggables.forEach(draggable => {
    if(draggable!=drag){
      draggable.addEventListener('drop',dragDrop_sub);
      draggable.addEventListener('dragover',dragOver_sub);
      draggable.addEventListener('dragenter',dragEnter_sub);
      draggable.addEventListener('dragleave',dragLeave_sub);
    }

  })
}

////// Main Activities Drag //////

var mdragstartIndex = -1;
var mdragstartid = -1;
var mheight = 0;

function swap_main_activities(start,end,sid,eid){
  if (start==-1){
    return 
  }
  start = parseInt(start)
  end = parseInt(end)
  let index_array = []
  let parent_clone = did(sid).cloneNode(true)
  let all_main_activities = document.getElementsByClassName('main_activity')
  // let ordered_list_m =[Array(all_main_activities.length).fill(-1)]
  let ordered_list_m = []
  for(let i =0;i<all_main_activities.length;i++){
    let m_index = parseInt(all_main_activities[i].getAttribute('data-index'));
    if (m_index!=start){
      if (start<end){
          if(end==m_index){
            index_array.push(m_index)
            ordered_list_m.push(did(sid).cloneNode(true))
            index_array.push(m_index-1)
            ordered_list_m.push(all_main_activities[i].cloneNode(true))
          }
          else if(m_index<start||m_index>end){
            ordered_list_m.push(all_main_activities[i].cloneNode(true))
            index_array.push(m_index)
        }
        else if(m_index>start&&m_index<end){
          ordered_list_m.push(all_main_activities[i].cloneNode(true))
          index_array.push(m_index-1)
        }
      }
      else{
        if(end==m_index){
          ordered_list_m.push(did(sid).cloneNode(true))
          index_array.push(m_index+1)
          ordered_list_m.push(all_main_activities[i].cloneNode(true))
          index_array.push(m_index)
          // ordered_list_m[m_index+1]=did(sid).cloneNode(true)
          // ordered_list_m[m_index]=all_main_activities[i].cloneNode(true)
        }
        else if(m_index<end||m_index>start){
          ordered_list_m.push(all_main_activities[i].cloneNode(true))
          index_array.push(m_index)
          // ordered_list_m[m_index]=all_main_activities[i].cloneNode(true)
      }
        else if(m_index>end){
          ordered_list_m.push(all_main_activities[i].cloneNode(true))
          index_array.push(m_index+1)
          // ordered_list_m[m_index+1]=all_main_activities[i].cloneNode(true)
        }
      }
    }
  }
  let list = [index_array,ordered_list_m]
  list = quicksort_jointlists(list,0,list[0].length)
  index_array = list[0]; ordered_list_m = list[1]
  let parent = did(sid).parentElement
  removeAllChildNodes(parent)
  let id_array = []
  let pos_array = []
  console.log(ordered_list_m)
  for(let i=0;i<ordered_list_m.length;i++){
    ordered_list_m[i].setAttribute('data-index',i)
    parent.appendChild(ordered_list_m[i])
    id_array.push(ordered_list_m[i].id)
    pos_array.push(i)
  }
  id_array = id_array.join()
  pos_array = pos_array.join()

  $.post( "../PHP/update_single_mainitem.php",{ project_id:window.project_id, action:"position", main_item:pos_array, main_id:id_array} );

  
}

function dragStart_m(){
  mdragstartIndex = this.getAttribute('data-index')
  sdragstartIndex = -1
  // this.classList.add('sub_drag_over')
  // let childs = this.querySelectorAll('.sub');
  // childs.forEach(child_ =>{
  //   child_.setAttribute('style','pointer-events:none')})
}
function dragDrop_m(){
  this.classList.remove('m_drag_over')
  this.removeAttribute('style')
  let childs = this.querySelectorAll('.sub');
  let draggables = document.querySelectorAll('.main_activity');
  let main_title = document.querySelectorAll('.main_activity_title')
  let sub_box = document.querySelectorAll('.sub_activity_box')
  main_title.forEach(title=>{
    title.removeAttribute('style')
  })
  sub_box.forEach(box=>{
    box.removeAttribute('style')
  })
  draggables.forEach(draggable => {
      draggable.removeEventListener('drop',dragDrop_m);
      draggable.removeEventListener('dragover',dragOver_m);
      draggable.removeEventListener('dragenter',dragEnter_m);
      draggable.removeEventListener('dragleave',dragLeave_m);

  })
  childs.forEach(child_ =>{
    child_.removeAttribute('style')})

  let dragendindex = this.getAttribute('data-index')
  let dragendid = this.id
  if (dragendid==mdragstartid){
    return
  }
  swap_main_activities(mdragstartIndex,dragendindex,mdragstartid,dragendid)
  }

function dragEnter_m(){
  console.log((this.offsetHeight+mheight)+"px")
  this.classList.add('m_drag_over')
  this.setAttribute('style','padding-bottom:'+(mheight)+"px!important")
  // let main_title = document.querySelectorAll('.main_activity_title')
  // let sub_box = document.querySelectorAll('.sub_activity_box')
  // main_title.forEach(title=>{
  //   title.setAttribute('style','pointer-events:none')
  // })
  sub_box.forEach(box=>{
    box.setAttribute('style','pointer-events:none')
  })

  // childs.forEach(child_ =>{
  //   child_.setAttribute('style','pointer-events:none')})
 }

function dragLeave_m(){
  this.classList.remove('m_drag_over')
  this.removeAttribute('style')
  let childs = this.children
  // let main_title = document.querySelectorAll('.main_activity_title')
  // let sub_box = document.querySelectorAll('.sub_activity_box')
  // main_title.forEach(title=>{
  //   title.removeAttribute('style')
  // })
  // sub_box.forEach(box=>{
  //   box.removeAttribute('style')
  // })
  // childs.forEach(child_ =>{
  //   child_.setAttribute('style','pointer-events:none')})
}

function dragOver_m(e){
  e.preventDefault()

}


function main_draggables(drag){
  console.log('main_drag')
  if (dragging=='sub'){
    return
  }
  let main_title = document.querySelectorAll('.main_activity_title')
  let sub_box = document.querySelectorAll('.sub_activity_box')
  main_title.forEach(title=>{
    title.setAttribute('style','pointer-events:none')
  })
  sub_box.forEach(box=>{
    box.setAttribute('style','pointer-events:none')
  })
  mheight = drag.offsetHeight
  mdragstartIndex = drag.getAttribute('data-index')
  mdragstartid = drag.id
  let draggables = document.querySelectorAll('.main_activity');
  drag.addEventListener('dragstart',dragStart_m)
  draggables.forEach(draggable => {

      draggable.addEventListener('drop',dragDrop_m);
      draggable.addEventListener('dragover',dragOver_m);
      draggable.addEventListener('dragenter',dragEnter_m);
      draggable.addEventListener('dragleave',dragLeave_m);


  })
}

