// ------ Brian's JavaScript------//

function parseHTML(fileName) {
    console.log("Running");
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = fileName;
      if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            console.log("Running");
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /*remove the attribute, and call this function once more:*/
            parseHTML();
          }
        }      
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
      }
    }
  };
////////////////////////////////////////////////////////////////////////////
//fetch main activity
  $( document ).ready(function() {
    $.ajax({
      url : '../PHP/pull_main_activity.php',
      type : 'POST',     
      success:function(data){
        var js_data = JSON.parse(data);
          alert(js_data[0][0]);
      }
  });
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
    console.log(start_date_id);
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
    console.log(sdate+"   "+edate)
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
  console.log("running")
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
    start_date_transformed = date_transform(start_date);
    end_date_transformed = date_transform(end_date);
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
    console.log(date_array);
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
  //////////////////////////////////////////////////////////////////////////////
/* Adds the Main Activity Line */
  function add_main_activity(){
    var add_cell = document.getElementById('added_cell');
    var n =add_cell.children.length;
    n=n+1;
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
    submitchild.setAttribute("class","fa fa-check-square")
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
/* Creates the main activity title from an input format to a title*/
  function change_input_to_title(this_element){
    var input_parent= this_element.parentElement.parentElement;
    var input_value= input_parent.children[0].value;
    var id = input_parent.parentElement.id;
    console.log(id);
    if(input_value!=""){
      var main_div=input_parent.parentElement;
      var subadd=document.createElement('div');
      subadd.setAttribute("class","sub_activity_add");
      subadd.setAttribute("onclick","add_sub_activity(this)");
      var subaddtwo=document.createElement("i");
      subaddtwo.setAttribute("class","far fa-plus-square");
      subadd.appendChild(subaddtwo);
      var title = document.createElement("h2");
      var divtitle=document.createElement("div")
      divtitle.setAttribute("class","main_activity_title")
      title.innerHTML=input_value;
      for (i=0;i<main_div.children.length;i++) {
        child=main_div.children[i];
        main_div.removeChild(child);
    }
    
    divtitle.appendChild(title)
    main_div.appendChild(divtitle);
    main_div.appendChild(subadd);
    $.post( "../PHP/main_activity_add.php", { main_id: id, main_activity: input_value} );

    }
  };

//////////////////////////////////////////////////////////////////////////////

  function add_id_to_box(id_array){
    ///Input is an array of IDs Input[0] must be sub activity ID Input[1] must be main Activity ID Input[2] must be the action
    console.log(id_array)  
    document.getElementById("main_id").innerHTML=id_array[0];
      document.getElementById("main_id").setAttribute("name",id_array[1]+"_"+(parseInt(id_array[0])-parseInt(id_array[1])*1000));
      document.getElementById("box").setAttribute("name",id_array[2]);
  }

  //////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////////////////////
/* Adds a sub Activity to the corresponding main activty*/
function add_sub_activity(this_tag){
  document.getElementById("main_page").style.blur = "10px";
    $('#content').load("../HTML/add_sub_activity.html");
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

    /* Add Dates to the Activity Location */
    var edit_div = document.createElement('div');
    edit_div.setAttribute("class","sub_activity_edit sub")
    var edit_empty_title = document.createElement("div");
    edit_empty_title.setAttribute("class","edit_icon");
    edit_div.appendChild(edit_empty_title);



  /*  Create ID */
  var id=parent_id+"001";
  var p_id = document.createElement("p");
  p_id.setAttribute("class","sub_id");
  p_id.setAttribute("id",id)
  p_id.innerHTML="001";
  id_div.appendChild(p_id);

  /* Create Activity Header Empty Div*/
  var activity_parent= parent_div.getElementsByClassName("sub_activity_name")[0];
  var h5_activity = document.createElement("h5");
  h5_activity.setAttribute("class","sub_name");
  h5_activity.setAttribute("id","name_"+id);
  name_div.appendChild(h5_activity);

   /* Create Start Date Header Empty Div* */
   var sdate_parent= parent_div.getElementsByClassName("sub_activity_sdate")[0];
   var input_sdate = document.createElement("h5");
   input_sdate.setAttribute("class","sub_sdate");
   input_sdate.setAttribute("id","sdate_"+id);
   sdate_div.appendChild(input_sdate);

   /* Create End Date Header Empty Div**/
   var edate_parent= parent_div.getElementsByClassName("sub_activity_edate")[0];
   var input_edate = document.createElement("h5");
   input_edate.setAttribute("class","sub_edate");
   input_edate.setAttribute("id","edate_"+id);
   edate_div.appendChild(input_edate);

  /* Create Duration Header Empty Div**/
  var duration_parent= parent_div.getElementsByClassName("sub_activity_duration")[0];
  var input_duration = document.createElement("h5");
  input_duration.setAttribute("class","sub_duration");
  input_duration.setAttribute("id","duration_"+id);
  duration_div.appendChild(input_duration);

     /* Create Contartcor Option Header Empty Div* */
   var contractor_parent= parent_div.getElementsByClassName("sub_activity_contractor")[0];
   var input_contractor = document.createElement("h5");
   input_contractor.setAttribute("class","sub_contractor");
   input_contractor.setAttribute("id","contractor_"+id);
   contractor_div.appendChild(input_contractor);

   /* Create Date Box Div Header Empty Div* */

   var bdate_parent= parent_div.getElementsByClassName("sub_activity_bdate")[0];
   var bdate_box = document.createElement("div");
   bdate_box.setAttribute("class","sub_bdate");
   bdate_box.setAttribute("id","bdate_"+id);
   date_box(bdate_box,id,bdate);
   bdate.appendChild(bdate_box);
  /* Create Date Box Div Header Empty Div* */

  var _parent= parent_div.getElementsByClassName("sub_activity_bdate")[0];
  var edit = document.createElement("i");
  edit.setAttribute("class","fas fa-edit");
  edit.setAttribute("id","edit_"+id);
  edit.setAttribute("onclick","update_sub_activity(this)")
  edit_div.appendChild(edit);



    activity_div.appendChild(id_div);
    activity_div.appendChild(name_div);
    activity_div.appendChild(sdate_div);
    activity_div.appendChild(edate_div);
    activity_div.appendChild(duration_div);
    activity_div.appendChild(contractor_div);
    activity_div.appendChild(edit_div);
    activity_div.appendChild(bdate);
    parent_div.appendChild(activity_div);
    parent_div.appendChild(this_tag);
    var action = "new";
    var id_array = [id,parent_id, action]


    setTimeout(add_id_to_box,150,id_array);
    
    return;
  }

  /* Add Id to sub activity number */
  var current_id=parent_div.getElementsByClassName("sub_id");
  var id=Number(current_id[current_id.length-1].id) +1;

  /*  Create ID */
  var id_parent= current_id[0].parentElement;
  var p_id = document.createElement("p");
  p_id.setAttribute("class","sub_id");
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
  id_parent.appendChild(p_id);

  /* Create Activity */
  var activity_parent= parent_div.getElementsByClassName("sub_activity_name")[0];
  var input_activity = document.createElement("h5");
  input_activity.setAttribute("class","sub_name");
  input_activity.setAttribute("id","name_"+id.toString());
  activity_parent.appendChild(input_activity);

   /* Create Start Date */
   var sdate_parent= parent_div.getElementsByClassName("sub_activity_sdate")[0];
   var input_sdate = document.createElement("h5");
   input_sdate.setAttribute("class","sub_sdate");
   input_sdate.setAttribute("id","sdate_"+id.toString());
   sdate_parent.appendChild(input_sdate);

   /* Create End Date */
   var edate_parent= parent_div.getElementsByClassName("sub_activity_edate")[0];
   var input_edate = document.createElement("h5");
   input_edate.setAttribute("class","sub_edate");
   input_edate.setAttribute("id","edate_"+id.toString());
   edate_parent.appendChild(input_edate);

   //Create Duration//
   var duration_parent= parent_div.getElementsByClassName("sub_activity_duration")[0];
   var input_duration = document.createElement("h5");
   input_duration.setAttribute("class","sub_duration");
   input_duration.setAttribute("id","duration_"+id.toString());
   duration_parent.appendChild(input_duration);

     /* Create Contartcor Option */
   var contractor_parent= parent_div.getElementsByClassName("sub_activity_contractor")[0];
   var input_contractor = document.createElement("h5");
   input_contractor.setAttribute("class","sub_contractor");
   input_contractor.setAttribute("id","contractor_"+id.toString());;
   contractor_parent.appendChild(input_contractor);

   var edit_parent= parent_div.getElementsByClassName("sub_activity_edit")[0];
   var edit = document.createElement("i");
   edit.setAttribute("class","fas fa-edit");
   edit.setAttribute("id","edit_"+id);
   edit.setAttribute("onclick","update_sub_activity(this)")
   edit_parent.appendChild(edit);

   /* Create Date Box */
   var bdate_parent= parent_div.getElementsByClassName("sub_activity_bdate")[0];
   var bdate_box = document.createElement("div");
   bdate_box.setAttribute("class","sub_bdate");
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
    console.log("yyyy")
    return [sdate,edate]
  }
  if(parseInt(sdate_part[0])==parseInt(edate_part[0])){
    if(parseInt(sdate_part[1])>parseInt(edate_part[1])){
      console.log("mm")
      return [sdate,edate]
    }
    if(parseInt(sdate_part[1])==parseInt(edate_part[1])){
      if(parseInt(sdate_part[2])>parseInt(edate_part[2])){
        console.log(sdate_part[2]+"_____"+edate_part[2])
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
  console.log(start_date)

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
  console.log("This is start date:"+start_date_tag.value+"  "+"This is end Date: "+end_date)

  date = sdate_greater_edate(start_date_tag.value,end_date);

  if (date.length>1){
    console.log("running")
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
console.log(parent_element);
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
$.post( "../PHP/add_sub_activity.php",{ sub_id: parseInt(id), main_id: parseInt(main_id), sub_activity:activity_title , start_date:start_date, end_date:end_date, duration:parseInt(duration), party_involved:party_involved} );
}
else{
  $.post( "../PHP/update_sub_activity.php",{ sub_id: parseInt(id), sub_activity:activity_title , start_date:start_date, end_date:end_date, duration:parseInt(duration), party_involved:party_involved} );
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
    $('#content').load("../HTML/add_sub_activity.html");
    $("#main_page").css({
      "-webkit-filter": "blur(3px)", 
      "-moz-filter": "blur(3px)", 
      "-o-filter": "blur(3px)", 
      "-ms-filter": "blur(3px)", 
      "filter": "blur(3px)", 
    }
  );
  console.log(this_tag.id.split("_"));
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


