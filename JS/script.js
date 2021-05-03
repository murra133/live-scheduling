// ------ Brian's JavaScript------//

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
      console.log(window.project_id);
      console.log(window.register_id);
      console.log(js_data_level['admin_level']);
      if(js_data_level['admin_level']<4){
        //console.log("true!!");
          $.ajax({
            url : '../PHP/pull_activity.php',
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
                    
                    var n;
                    for(n = 0; n<date_array.length; n++){
                      if(sub_bdate_div.children[z].id===(sub_id+"_"+date_array[n])){
                        sub_bdate_div.children[z].style.backgroundColor="green";
                      }
                    }
                  }

                    id_div.appendChild(sub_id_div);
                    name_div.appendChild(sub_name_div);
                    sdate_div.appendChild(sub_sdate_div);
                    edate_div.appendChild(sub_edate_div);
                    duration_div.appendChild(sub_duration_div);
                    contractor_div.appendChild(sub_contractor_div);
                    bdate.appendChild(sub_bdate_div);
                    edit_div.appendChild(sub_edit_div);
                    delete_div.appendChild(sub_delete_div);
                    activity_div.appendChild(id_div);
                    activity_div.appendChild(name_div);
                    activity_div.appendChild(sdate_div);
                    activity_div.appendChild(edate_div);
                    activity_div.appendChild(duration_div);
                    activity_div.appendChild(contractor_div);
                    activity_div.appendChild(edit_div);
                    activity_div.appendChild(delete_div);
                    activity_div.appendChild(bdate);
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
                  
                  var n;
                  for(n = 0; n<date_array.length; n++){
                    if(sub_bdate_div.children[z].id===(sub_id+"_"+date_array[n])){
                      sub_bdate_div.children[z].style.backgroundColor="green";
                    }
                  }
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

var project_name = cookie_value('project_name');
document.getElementById('main_title').innerHTML = project_name+" Schedule";
});
//////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////
/*Checks for today's date once the document loads and inputs it onto the start date div*/
  $(document).ready(function start_date_today(){
    var start_date_input = document.getElementById("start_date_input");
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    document.getElementById("start_date").innerHTML= mm+"/"+dd;
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
function three_week_ahead(this_tag){
  var n;
  var date = document.getElementById("start_date").innerHTML;
  var dd = parseInt(date.split("/")[1]);
  var mm = parseInt(date.split("/")[0]); 
  for(n=0;n<21;n++) {

    if (dd==31 && (mm==4||mm==6||mm==9||mm==11)){
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
      date.innerHTML = nmm+'/'+ndd;
      this_tag.appendChild(date);
      dd=dd+1;
  }
  return (this_tag);

  };
//////////////////////////////////////////////////////////////////////////////
  /*Takes the start date and end date inputs and fills the respective cells*/
  function date_filler(sdate,edate){
    var ndd;
    var nmm;
    var sdate_split = sdate.split("-");
    var edate_split = edate.split("-");
    var dd = parseInt(sdate_split[2]);
    var mm = parseInt(sdate_split[1]); 
    var edd = parseInt(edate_split[2]);
    var emm = parseInt(edate_split[1]);
    var n =0;
    var date = Array();
    while((ndd!=edd) || (nmm!=emm)) {
  
      if (dd==31 && (mm==4||mm==6||mm==9||mm==11)){
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
  
      if(ndd<10) 
      {
          ndd='0'+ndd;
      }     
      if(nmm<10) 
      {
          nmm='0'+nmm;
      } 
        date[n] = nmm+'/'+ndd;
        dd=dd+1;
        n=n+1;
    }
    return (date);
  
    };
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
/*Checks for updated start date on the input box and updates the start date div*/
$(document).on('change', '#start_date_input', function(){
  var new_date= this.value;
  var dd= new_date.split("-")[2];
  var mm = new_date.split("-")[1];
  document.getElementById("start_date").innerHTML=(mm+"/"+dd);

  /*Updates all existing date cells and their id's*/
  var cell_dates = document.getElementsByClassName("cell_dates");
  for (i=0;i<cell_dates.length;i++){
    removeAllChildNodes(cell_dates[i]);
    three_week_ahead(cell_dates[i]);
  }

  ///Updates the filler once a date is updated///
  var sub_id=document.getElementsByClassName("sub_id");
  var id_array = new Array();
  for (i=0;i<sub_id.length;i++){
    id_array[i] = sub_id[i].id;
  }
  for (n=0;n<id_array.length;n++){
    start_date = document.getElementById("sdate_"+id_array[n]).innerHTML;
    end_date = document.getElementById("edate_"+id_array[n]).innerHTML;
    start_date_transformed = document.getElementById("sdate_"+id_array[n]).getAttribute("name")
    end_date_transformed = document.getElementById("edate_"+id_array[n]).getAttribute("name");
    var box_date = document.getElementById("bdate_"+id_array[n]);
    removeAllChildNodes(box_date);
    date_box(box_date,id_array[n],cell_dates[0]);
    var date_all = box_date.children;
    for (var j = 0; j<date_all.length; j++){
      var date_j = date_all[j];
      date_j.style.backgroundColor = "white";
    }
    var date_array = date_filler(start_date_transformed, end_date_transformed);
    var i;
    for(i = 0; i<date_array.length; i++){
      if( document.getElementById(id_array[n]+"_"+date_array[i])===null){
        continue;
      }
      else {document.getElementById(id_array[n]+"_"+date_array[i]).style.backgroundColor="green";
      }
    }
  }

  })
//////////////////////////////////////////////////////////////////////////////

function date_format_changer(date){
  ///input date yyyy-mm-dd output mm/dd////////
  var formatted_date = date.split("-")[1]+"/"+date.split("-")[2];
  return formatted_date;
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
    rejectchild.setAttribute("class","fa fa-times-circle-o")
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
    var form=document.createElement('form')
    form.setAttribute("method","post");
    var inp = document.createElement('input');
    inp.setAttribute("type","text");
    inp.setAttribute("class","main_activity_input");
    inp.setAttribute("name","main_activity");
    var submit = document.createElement("div");
    submit.setAttribute("type","submit");
    submitchild = document.createElement("i");
    submitchild.setAttribute("class","fa fa-check-square clickable")
    submitchild.setAttribute("onclick","change_input_to_title(this)")
    rejectchild = document.createElement("i");
    rejectchild.setAttribute("class","fa fa-times-circle-o")
    submit.appendChild(submitchild);
    submit.appendChild(rejectchild);
    form.appendChild(inp);
    form.appendChild(submit);
    div.replaceChild(form,old_child);





}
//////////////////////////////////////////////////////////////////////////////
/* Creates the main activity title from an input format to a title*/
  function change_input_to_title(this_element){
    var main_parent_element = this_element.parentElement.parentElement.parentElement;
    var input_parent= this_element.parentElement.parentElement;
    var input_value= input_parent.children[0].value;
    var id = input_parent.parentElement.id;
    if(input_value!=""){
      if (main_parent_element.children.length==1){
        console.log('running')
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
    console.log(id_array);///Input is an array of IDs Input[0] must be sub activity ID Input[1] must be main Activity ID Input[2] must be the action
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
    duration_div.setAttribute("class","sub_activity_duration sub")
    var duration_title = document.createElement("h3");
    duration_title.setAttribute("class","duration_title");
    duration_title.innerHTML="Duration";
    duration_div.appendChild(duration_title);

    /* Add Party Invloved */
    var contractor_div = document.createElement('div');
    contractor_div.setAttribute("class","sub_activity_contractor sub")
    var contractor_title = document.createElement("h3");
    contractor_title.setAttribute("class","contractor_title");
    contractor_title.innerHTML="Party Involved";
    contractor_div.appendChild(contractor_title);

    /* Add Dates to the Activity Location */
    var bdate = document.createElement('div');
    bdate.setAttribute("class","sub_activity_bdate sub")
    var bdate_dates = document.createElement("div");
    bdate_dates.setAttribute("class","cell_dates");
    three_week_ahead(bdate_dates);
    bdate.appendChild(bdate_dates);

    /* Add edit to the Activity Location */
    var edit_div = document.createElement('div');
    edit_div.setAttribute("class","sub_activity_edit sub")
    var edit_empty_title = document.createElement("div");
    edit_empty_title.setAttribute("class","edit_icon");
    edit_div.appendChild(edit_empty_title);

    // Adds Delete Icon ///
    var delete_div = document.createElement('div');
    delete_div.setAttribute("class","sub_activity_delete sub")
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
  input_activity.setAttribute("class"," sub_name sub_activity_"+id.toString());
  input_activity.setAttribute("id","name_"+id.toString());
  input_activity.innerHTML=activity_title;

   /* Create Start Date */
   var input_sdate = document.createElement("h5");
   input_sdate.setAttribute("class","sub_sdate sub_activity_"+id.toString());
   input_sdate.setAttribute("id","sdate_"+id.toString());
   input_sdate.setAttribute("name",start_date);
   input_sdate.innerHTML = date_format_changer(start_date);

   /* Create End Date */
   var input_edate = document.createElement("h5");
   input_edate.setAttribute("class","sub_edate sub_activity_"+id.toString());
   input_edate.setAttribute("id","edate_"+id.toString());
   input_edate.setAttribute("name",end_date)
   input_edate.innerHTML = date_format_changer(end_date);

   //Create Duration//
   var input_duration = document.createElement("h5");
   input_duration.setAttribute("class","sub_duration sub_activity_"+id.toString());
   input_duration.setAttribute("id","duration_"+id.toString());
   input_duration.innerHTML = duration;

     /* Create Contartcor Option */
   var input_contractor = document.createElement("h5");
   input_contractor.setAttribute("class","sub_contractor sub_activity_"+id.toString());
   input_contractor.setAttribute("id","contractor_"+id.toString());
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
  document.getElementById("main_page").style.blur = "10px";
    $('#content_box').load("../HTML/add_sub_activity.html");
    $("#main_page").css({
      "-webkit-filter": "blur(3px)", 
      "-moz-filter": "blur(3px)", 
      "-o-filter": "blur(3px)", 
      "-ms-filter": "blur(3px)", 
      "filter": "blur(3px)", 
    }
  );

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
  var input_activity = document.createElement("h5");
  input_activity.setAttribute("class","sub_name sub_activity_"+id.toString());
  input_activity.setAttribute("id","name_"+id.toString());
  activity_parent.appendChild(input_activity);

   /* Create Start Date */
   var sdate_parent= parent_div.getElementsByClassName("sub_activity_sdate")[0];
   var input_sdate = document.createElement("h5");
   input_sdate.setAttribute("class","sub_sdate sub_activity_"+id.toString());
   input_sdate.setAttribute("id","sdate_"+id.toString());
   sdate_parent.appendChild(input_sdate);

   /* Create End Date */
   var edate_parent= parent_div.getElementsByClassName("sub_activity_edate")[0];
   var input_edate = document.createElement("h5");
   input_edate.setAttribute("class","sub_edate sub_activity_"+id.toString());
   input_edate.setAttribute("id","edate_"+id.toString());
   edate_parent.appendChild(input_edate);

   //Create Duration//
   var duration_parent= parent_div.getElementsByClassName("sub_activity_duration")[0];
   var input_duration = document.createElement("h5");
   input_duration.setAttribute("class","sub_duration sub_activity_"+id.toString());
   input_duration.setAttribute("id","duration_"+id.toString());
   duration_parent.appendChild(input_duration);

     /* Create Contartcor Option */
   var contractor_parent= parent_div.getElementsByClassName("sub_activity_contractor")[0];
   var input_contractor = document.createElement("h5");
   input_contractor.setAttribute("class","sub_contractor sub_activity_"+id.toString());
   input_contractor.setAttribute("id","contractor_"+id.toString());;
   contractor_parent.appendChild(input_contractor);
  //// Create Edit Button////
   var edit_parent= parent_div.getElementsByClassName("sub_activity_edit")[0];
   var edit = document.createElement("i");
   edit.setAttribute("class","fas fa-edit edit_sub_icon clickable sub_activity_"+id.toString());
   edit.setAttribute("id","edit_"+id);
   edit.setAttribute("onclick","update_sub_activity(this)")
   edit_parent.appendChild(edit);

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
   setTimeout(add_id_to_box,150,id_array);


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
function add_duration_to_dates(start_date,end_date,duration){
  //Input is duration in days  start date in yyyy-mm-dd, end date in yyyy-mm-dd//
  
}
//////////////////////////////////////////////////////////////////////////////
///Checks for Errors between the start date and end date box once the start date box is populated

$(document).on('change','.start_date_input_box', function(){
  var start_date = this.value;
  var end_date_tag = document.getElementById("end_date_input_box");

  if (end_date_tag.value==""){
    end_date_tag.value=start_date;
  }
  date = sdate_greater_edate(start_date,end_date_tag.value);
  if (date.length>1){
    document.getElementById("end_date_input_box").value=date[0];
  }
  var duration_tag = document.getElementById("duration");
  duration_tag.value = number_of_days_from_date(end_date_tag.value)-number_of_days_from_date(start_date);

  var id=document.getElementById("main_id").innerHTML;
  var date_all = document.getElementById("bdate_"+id).children;
  for (var j = 0; j<date_all.length; j++){
    var date_j = date_all[j];
    date_j.style.backgroundColor = "white";
  }
  var date_array = date_filler(start_date,end_date_tag.value);
  var i;
  for(i = 0; i<date_array.length; i++){
    if( document.getElementById(id+"_"+date_array[i])===null){
      continue;
    }
    else {document.getElementById(id+"_"+date_array[i]).style.backgroundColor="green";
    }
  }

})

//////////////////////////////////////////////////////////////////////////////

///Checks for Errors between the start date and end date box once the end date box is populated
$(document).on('change','.end_date_input_box', function(){
  var end_date = this.value;
  var start_date_tag = document.getElementById("start_date_input_box");

  if (start_date_tag.value==""){
    start_date_tag.value=end_date;
  }

  date = sdate_greater_edate(start_date_tag.value,end_date);

  if (date.length>1){
    document.getElementById("start_date_input_box").value=date[1];
  }
  var duration_tag = document.getElementById("duration");
  duration_tag.value = number_of_days_from_date(end_date)-number_of_days_from_date(start_date_tag.value);
  //Fills In Cells corresponding to dates
  var id=document.getElementById("main_id").innerHTML;
  var date_all = document.getElementById("bdate_"+id).children;
  for (var j = 0; j<date_all.length; j++){
    var date_j = date_all[j];
    date_j.style.backgroundColor = "white";
  }
  var date_array = date_filler(start_date_tag.value,end_date);
  var i;
  for(i = 0; i<date_array.length; i++){
    if( document.getElementById(id+"_"+date_array[i])===null){
      continue;
    }
    else {document.getElementById(id+"_"+date_array[i]).style.backgroundColor="green";
    }
  }
})

//////////////////////////////////////////////////////////////////////////////
$(document).on('change','#duration', function(){
  var duration_value = this.value;

})
//////////////////////////////////////////////////////////////////////////////
function form_to_schedule(this_tag){
var parent_element = this_tag.parentElement.parentElement;
var id = document.getElementById("main_id").innerHTML;
var activity_title = document.getElementById("activity_title_input").value;
var start_date = document.getElementById("start_date_input_box").value;
var start_date_format = start_date.split("-")[1]+"/"+start_date.split("-")[2];
var end_date = document.getElementById("end_date_input_box").value;
var end_date_format = end_date.split("-")[1]+"/"+end_date.split("-")[2];
var duration = document.getElementById("duration").value;
var party_involved = document.getElementById("party_involved_box").value;
////Need to add section for Relationships once relationships are figured out///
var id_array= document.getElementById("main_id").getAttribute("name");
console.log(id_array)
var main_id = id_array.split("_")[0];

//Adds the Main Activity Title
document.getElementById("name_"+id).innerHTML=activity_title;
document.getElementById("sdate_"+id).innerHTML=start_date_format;
document.getElementById("sdate_"+id).setAttribute("name",start_date);
document.getElementById("edate_"+id).innerHTML=end_date_format;
document.getElementById("edate_"+id).setAttribute("name",end_date);
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

////
function update_sub_activity(this_tag){
  ////Once the Edit button is clicked, it takes the tag where the edit button is located as an input, you can use this to find the ID///////////////
  document.getElementById("main_page").style.blur = "10px";
    $('#content_box').load("../HTML/add_sub_activity.html");
    $("#main_page").css({
      "-webkit-filter": "blur(3px)", 
      "-moz-filter": "blur(3px)", 
      "-o-filter": "blur(3px)", 
      "-ms-filter": "blur(3px)", 
      "filter": "blur(3px)", 
    }
  );
  var sub_id = this_tag.id.split("_")[1];
  var parent_id = this_tag.parentElement.parentElement.parentElement.id;
  var action = "update"
  var id_array = [sub_id,parent_id,action]
  var activity_title = document.getElementById("name_"+sub_id).innerHTML;
  var start_date = document.getElementById("sdate_"+sub_id).getAttribute("name");
  var end_date = document.getElementById("edate_"+sub_id).getAttribute("name");
  var duration = document.getElementById("duration_"+sub_id).innerHTML;
  var party_involved = document.getElementById("contractor_"+sub_id).innerHTML;
  var values_array = [activity_title,start_date,end_date,duration,party_involved];
  setTimeout(add_id_to_box,150,id_array);
  setTimeout(place_values_in_subactivity_box,150,values_array);
}

/////////////////////////////////////////////////////////////////
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
      console.log(x[i].childNodes[0].childNodes[0]);
  } */
  if(input==""){
    for(var l=0;l<x.length;l++){
      x[l].parentElement.style.display="inline-block";
    }
    for (var m = 0; m < y.length; m++){
        y[m].parentElement.parentElement.parentElement.style.display="inline-block";
        var split = y[m].id.split("_")[1];
        console.log(split);
        var row = document.getElementsByClassName("sub_activity_"+split);
        for (var k3=0;k3<row.length;k3++){
          row[k3].style.display = "";
        }
    }
  }
  else{
    for (var i = 0; i < x.length; i++) {  
      console.log(x[i].childNodes[0].textContent.toLowerCase());
      console.log(input);
      if (!x[i].childNodes[0].textContent.toLowerCase().includes(input)) { 
        console.log(x[i].childNodes[0].textContent);
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
                console.log(split);
                var row = document.getElementsByClassName("sub_activity_"+split);
                for (var k=0;k<row.length;k++){
                  row[k].style.display = "none";
                }
              }
              else{
                var split = y[j].id.split("_")[1];
                console.log(split);
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
  console.log('Push_to_all_Running')
  $.post( "../PHP/push_to_all.php", { project_id:window.project_id});
}

function add_function_to_push(function_call){;
  var search_tag =document.getElementById('push_all_button');
  search_tag.setAttribute('onclick',function_call);
}
