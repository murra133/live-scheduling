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



function three_week_ahead(this_tag){
  var n;
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
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

  function date_filler(sdate,edate){
    var ndd;
    var nmm;
    var sdate_split = sdate.split("-");
    var edate_split = edate.split("-");
    var dd = parseInt(sdate_split[2]);
    var mm = parseInt(sdate_split[1]); 
    var edd = parseInt(edate_split[2]);
    var emm = parseInt(edate_split[1]);
    console.log(edd);
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
        console.log(ndd);
        date[n] = nmm+'/'+ndd;
        dd=dd+1;
        n=n+1;
    }
    return (date);
  
    };

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

  function add_main_activity(){
    var add_cell = document.getElementById('added_cell');
    var n =add_cell.children.length;
    n=n+1;
    console.log(n);
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


  function change_input_to_title(this_element){
    var input_parent= this_element.parentElement.parentElement;
    var input_value= input_parent.children[0].value;
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
    

    }
  };

function add_sub_activity(this_tag){
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



  /*  Creat ID */
  var id=parent_id+"001";
  var p_id = document.createElement("p");
  p_id.setAttribute("class","sub_id");
  p_id.setAttribute("id",id)
  p_id.innerHTML="001";
  id_div.appendChild(p_id);

  /* Create Activity */
  var activity_parent= parent_div.getElementsByClassName("sub_activity_name")[0];
  var input_activity = document.createElement("input");
  input_activity.setAttribute("class","sub_name");
  input_activity.setAttribute("id","name_"+id);
  input_activity.setAttribute("type","text");
  input_activity.setAttribute("value","Enter Activity Here");
  name_div.appendChild(input_activity);

   /* Create Start Date */
   var sdate_parent= parent_div.getElementsByClassName("sub_activity_sdate")[0];
   var input_sdate = document.createElement("input");
   input_sdate.setAttribute("class","sub_sdate");
   input_sdate.setAttribute("id","sdate_"+id);
   input_sdate.setAttribute("type","date");
   sdate_div.appendChild(input_sdate);

   /* Create End Date */
   var edate_parent= parent_div.getElementsByClassName("sub_activity_edate")[0];
   var input_edate = document.createElement("input");
   input_edate.setAttribute("class","sub_edate");
   input_edate.setAttribute("id","edate_"+id);
   input_edate.setAttribute("type","date");
   edate_div.appendChild(input_edate);

     /* Create Contartcor Option */
   var contractor_parent= parent_div.getElementsByClassName("sub_activity_contractor")[0];
   var input_contractor = document.createElement("select");
   input_contractor.setAttribute("class","sub_contractor");
   input_contractor.setAttribute("id","contractor_"+id);
   contractor_div.appendChild(input_contractor);

   /* Create Date Box Div */

   var bdate_parent= parent_div.getElementsByClassName("sub_activity_bdate")[0];
   var bdate_box = document.createElement("div");
   bdate_box.setAttribute("class","sub_bdate");
   bdate_box.setAttribute("id","bdate_"+id);
   date_box(bdate_box,id,bdate);
   bdate.appendChild(bdate_box);

    activity_div.appendChild(id_div);
    activity_div.appendChild(name_div);
    activity_div.appendChild(sdate_div);
    activity_div.appendChild(edate_div);
    activity_div.appendChild(contractor_div);
    activity_div.appendChild(bdate);
    parent_div.appendChild(activity_div);
    parent_div.appendChild(this_tag);
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
  var input_activity = document.createElement("input");
  input_activity.setAttribute("class","sub_name");
  input_activity.setAttribute("id","name_"+id.toString());
  input_activity.setAttribute("type","text");
  input_activity.setAttribute("value","Enter Activity Here");
  activity_parent.appendChild(input_activity);

   /* Create Start Date */
   var sdate_parent= parent_div.getElementsByClassName("sub_activity_sdate")[0];
   var input_sdate = document.createElement("input");
   input_sdate.setAttribute("class","sub_sdate");
   input_sdate.setAttribute("id","sdate_"+id.toString());
   input_sdate.setAttribute("type","date");
   sdate_parent.appendChild(input_sdate);

   /* Create End Date */
   var edate_parent= parent_div.getElementsByClassName("sub_activity_edate")[0];
   var input_edate = document.createElement("input");
   input_edate.setAttribute("class","sub_edate");
   input_edate.setAttribute("id","edate_"+id.toString());
   input_edate.setAttribute("type","date");
   edate_parent.appendChild(input_edate);

     /* Create Contartcor Option */
   var contractor_parent= parent_div.getElementsByClassName("sub_activity_contractor")[0];
   var input_contractor = document.createElement("select");
   input_contractor.setAttribute("class","sub_contractor");
   input_contractor.setAttribute("id","contractor_"+id.toString());;
   contractor_parent.appendChild(input_contractor);

   /* Create Date Box */
   var bdate_parent= parent_div.getElementsByClassName("sub_activity_bdate")[0];
   var bdate_box = document.createElement("div");
   bdate_box.setAttribute("class","sub_bdate");
   bdate_box.setAttribute("id","bdate_"+id);
   dates=bdate_parent.getElementsByClassName("cell_dates")[0];
   date_box(bdate_box,id,dates);
   bdate_parent.appendChild(bdate_box);



  console.log(id_parent);
console.log('running');
}

$(document).on('change', '.sub_sdate', function(){
  console.log("runnig")
  var id=this.id;
  var value = this.value;
  console.log(value);
  var sdate_id_array= id.split("_");
  var edate_id = "edate_"+sdate_id_array[sdate_id_array.length-1];
  var id = sdate_id_array[sdate_id_array.length-1];
  var date_all = document.getElementById("bdate_"+id).children;
  for (var j = 0; j<date_all.length; j++){
    var date_j = date_all[j];
    date_j.style.backgroundColor = "white";
  }
  console.log(edate_id);
  console.log(sdate_id_array);
  var edate = document.getElementById(edate_id);
  if (edate.value==""){
    edate.value=this.value;
  }

  //fix sdate>edate scenario
  var sdate_part = value.split("-");
  var edate_part = edate.value.split("-");
  if(sdate_part[0]>edate_part[0]){
    edate.value=this.value;
  }
  if(sdate_part[0]==edate_part[0]){
    if(sdate_part[1]>edate_part[1]){
      edate.value=this.value;
    }
    if(sdate_part[1]==edate_part[1]){
      if(sdate_part[2]>edate_part[2]){
        edate.value=this.value;
      }
    }
  }
  
  console.log("Sdate="+value+" Edate="+edate.value);
  var date_array = date_filler(value,edate.value);
  console.log(date_array);
  var i;
  for(i = 0; i<date_array.length; i++){
    if( document.getElementById(id+"_"+date_array[i])===null){
      continue;
    }
    else {document.getElementById(id+"_"+date_array[i]).style.backgroundColor="green";
    }
  }


}
)

$(document).on('change', '.sub_edate', function(){
  console.log("runnig")
  var id=this.id;
  var value = this.value;
  var edate_id_array= id.split("_");
  var sdate_id = "sdate_"+edate_id_array[edate_id_array.length-1];
  var id = edate_id_array[edate_id_array.length-1];
  var date_all = document.getElementById("bdate_"+id).children;
  for (var j = 0; j<date_all.length; j++){
    var date_j = date_all[j];
    date_j.style.backgroundColor = "white";
  }
  console.log(sdate_id);
  console.log(edate_id_array);
  var sdate = document.getElementById(sdate_id);
  if (sdate.value==""){
    sdate.value=this.value;
  }

  //fix sdate>edate scenario
  var sdate_part = sdate.value.split("-");
  var edate_part = value.split("-");
  if(sdate_part[0]<edate_part[0]){
    this.value=sdate.value;
  }
  if(sdate_part[0]==edate_part[0]){
    if(sdate_part[1]<edate_part[1]){
      this.value=sdate.value;
    }
    if(sdate_part[1]==edate_part[1]){
      if(sdate_part[2]<edate_part[2]){
        this.value=sdate.value;
      }
    }
  }

  console.log("edate="+value+" sdate="+sdate.value);
  var date_array = date_filler(sdate.value,value);
  console.log(date_array);
  var i;
  for(i = 0; i<date_array.length; i++){
    if( document.getElementById(id+"_"+date_array[i])===null){
      continue;
    }
    else {document.getElementById(id+"_"+date_array[i]).style.backgroundColor="green";
    }
  }


}
)


/*  if (parent_div,children[0].tagName=="form"){
    var warning = document.createElement("h4")
    warning.style.color = "red";
    warning.innerHTML = "You Must Create the Mani Activity Above First";
    parent_div.appendChild(warning);
  }*/