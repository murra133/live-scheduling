// ------ Brian's JavaScript------//
function html_move(arr, old_index, new_index) {

  var old_html = arr[old_index];
  var new_arr = new Array();
  var k = 0;
  for(var n=0;n<arr.length+1;n++){
    if (n!==new_index){
      new_arr[n] = arr[k];
      k++;
    }
    else{
      new_arr[n]=old_html;
    }
  }
  return new_arr;

};

function removeElement(element) {
 // Removes an element from the document
 element.parentNode.removeChild(element);
 return;
 }

 function addDays(date, add_days) {
   ////Takes a date and the amount of days to add///
  var date_val = new Date(date);
  date_val.setDate(date_val.getDate() + add_days);
  return date_val;
}


$( document ).ready(function() {
  setTimeout(add_values_to_selectpicker,1000);
});

function update_dates(tag_element){
  var parentNode = tag_element.parentNode;
  var relationship_tag = parentNode[0];
  var lag_tag = parentNode[3];
  var activity_tag = parentNode.childNodes[5].childNodes[0];
   if (activity_tag.value == "0"){
     return;
}
else{
  var id = activity_tag.value;
  if(relationship_tag.value=="FS"){}

}
}





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
    var admin_level = 1;
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
            var activity_div = empty_divs[6];
  
            ///Gets dates from bdate////
  
            for (var j=0;j<Object.keys(sub_activities_array).length;j++){
              //// Get All Sub Activities Variables////
              var sub_id = Object.keys(sub_activities_array)[j];
              var sub_activity_title = sub_activities_array[sub_id]["Sub_Activity"];
              var sub_start_date = sub_activities_array[sub_id]["Start_Date"];
              var sub_end_date = sub_activities_array[sub_id]["End_Date"];
              var sub_duration = sub_activities_array[sub_id]["Duration"];
              var sub_party_involved = sub_activities_array[sub_id]["Party_Involved"];
              ////////// Adds Values to Sub Activity Box/////
  
              var filled_divs = download_sub_activity(main_id,sub_id,sub_activity_title,sub_start_date, sub_end_date,sub_duration,sub_party_involved)
              var sub_id_div = filled_divs[0];
              var sub_name_div = filled_divs[1];
              var sub_sdate_div = filled_divs[2];
              var sub_edate_div = filled_divs[3];
              var sub_duration_div = filled_divs[4];
              var sub_contractor_div = filled_divs[5];
  
  
              id_div.appendChild(sub_id_div);
              name_div.appendChild(sub_name_div);
              sdate_div.appendChild(sub_sdate_div);
              edate_div.appendChild(sub_edate_div);
              duration_div.appendChild(sub_duration_div);
              contractor_div.appendChild(sub_contractor_div);
              activity_div.appendChild(id_div);
              activity_div.appendChild(name_div);
              activity_div.appendChild(sdate_div);
              activity_div.appendChild(edate_div);
              activity_div.appendChild(duration_div);
              activity_div.appendChild(contractor_div);
              divadd.appendChild(activity_div);
  
              
  
            }
            main_parent.appendChild(divadd)
            
        
  
            /*  Adds Div for Dates for Main Activity */
          }
            
          }
    })



          $.ajax({
            url : '../PHP/pull_relationship.php',
            type : 'POST',
            data : 'project_id='+window.project_id+'&action=child',     
            success:function(relationship_data){
              global_child_rdata = JSON.parse(relationship_data);
              
          }
        })

        $.ajax({
          url : '../PHP/pull_relationship.php',
          type : 'POST',
          data : 'project_id='+window.project_id+'&action=parent',     
          success:function(relationship_data){
            global_parent_rdata = JSON.parse(relationship_data);

        }
      })
  
          var project_name = cookie_value('project_name');
          document.getElementById('main_title').innerHTML = project_name+" Schedule";
          change_array = new Array();

          global_parent_rdata = new Object();
          object.create(global_child_rdata)

  });


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

  function create_all_sub_activity_divs(){
    var activity_div=document.createElement('div');
    activity_div.setAttribute("class","sub_activity");
    /* Add Title for ID */
    var id_div = document.createElement('div');
    id_div.setAttribute("class","sub_activity_id sub")
    var id_title = document.createElement("h3");
    id_title.setAttribute("class","id_title");
    id_title.setAttribute("style","display:none");
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
    duration_title.setAttribute("style","display:none");
    duration_title.innerHTML="Duration";
    duration_div.appendChild(duration_title);

    /* Add Party Invloved */
    var contractor_div = document.createElement('div');
    contractor_div.setAttribute("class","sub_activity_contractor sub")
    var contractor_title = document.createElement("h3");
    contractor_title.setAttribute("class","contractor_title");
    contractor_title.setAttribute("style","display:none");
    contractor_title.innerHTML="Party Involved";
    contractor_div.appendChild(contractor_title);


    return [id_div, name_div, sdate_div, edate_div, duration_div,contractor_div, activity_div];
  };

  function download_sub_activity(main_id,sub_id,activity_title,start_date,end_date,duration,party_involved){
    var parent_id = main_id;
    var id = sub_id;
    var p_id = document.createElement("h5");
    p_id.setAttribute("class","sub_id");
    p_id.setAttribute("style","display:none")
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
    input_activity.setAttribute("class","sub_name clickable ");
    input_activity.setAttribute("onclick","write_activty(this)")
    input_activity.setAttribute("id","name_"+id.toString());
    input_activity.innerHTML=activity_title;
  
     /* Create Start Date */
     var input_sdate = document.createElement("h5");
     input_sdate.setAttribute("class","sub_sdate");
     input_sdate.setAttribute("id","sdate_"+id.toString());
     input_sdate.setAttribute("name",start_date);
     input_sdate.innerHTML = date_format_changer(start_date);
  
     /* Create End Date */
     var input_edate = document.createElement("h5");
     input_edate.setAttribute("class","sub_edate");
     input_edate.setAttribute("id","edate_"+id.toString());
     input_edate.setAttribute("name",end_date)
     input_edate.innerHTML = date_format_changer(end_date);
  
     //Create Duration//
     var input_duration = document.createElement("h5");
     input_duration.setAttribute("class","sub_duration");
     input_duration.setAttribute("id","duration_"+id.toString());
     input_duration.setAttribute("style","display:none");
     input_duration.innerHTML = duration;
  
       /* Create Contartcor Option */
     var input_contractor = document.createElement("h5");
     input_contractor.setAttribute("class","sub_contractor");
     input_contractor.setAttribute("style","display:none");
     input_contractor.setAttribute("id","contractor_"+id.toString());
     input_contractor.innerHTML = party_involved

  
     var filled_divs = [p_id, input_activity,input_sdate,input_edate,input_duration,input_contractor];
      return filled_divs;
    }

    function date_format_changer(date){
        ///input date yyyy-mm-dd output mm/dd////////
        var formatted_date = date.split("-")[1]+"/"+date.split("-")[2]+"/"+date.split("-")[0];
        return formatted_date;
    };

    function write_activty(activity_name_tag){
      var relationship_array=document.getElementsByClassName('relationship');
      rel_lenght =relationship_array.length;
      for (var j = 0; j<rel_lenght;j++){
        removeElement(relationship_array[0]);
      }
        id = activity_name_tag.id.split("_")[1];
        activity_title = activity_name_tag.innerHTML;
        sdate = document.getElementById("sdate_"+id);
        edate = document.getElementById("edate_"+id);
        duration= document.getElementById("duration_"+id).innerHTML;
        sdate_html = sdate.innerHTML;
        edate_html = edate.innerHTML;
        sdate_calendar = sdate.getAttribute('name');
        edate_calendar = edate.getAttribute('name');

        document.getElementById('activity_title').innerHTML = activity_title;
        document.getElementById('activity_title').setAttribute('name',id);
        document.getElementById('sdate_relationship').innerHTML = sdate_html;
        document.getElementById('sdate_relationship').setAttribute('name',sdate_calendar);
        document.getElementById('edate_relationship').innerHTML = edate_html;
        document.getElementById('edate_relationship').setAttribute('name',edate_calendar);
        document.getElementById('duration_relationship').innerHTML = duration;
        document.getElementById('placeholder').setAttribute('style','display:none');
        document.getElementById('right_content').removeAttribute('style');

       

        for(var k=0;k<Object.keys(global_parent_rdata[id]).length;k++){
          var child_id = Object.keys(global_parent_rdata[id])[k];
          var relationship_abbr = global_parent_rdata[id][child_id]['Relationship'];
          var relationship = relationship_title(relationship_abbr);
          var Lag = global_parent_rdata[id][child_id]['Lag'];
          var child_title = document.getElementById('name_'+child_id).innerHTML;
          var sample = document.getElementById('submitted_relationship_sample');
          var cloned_sample = sample.cloneNode(true);
          cloned_sample.removeAttribute('id');
          cloned_sample.removeAttribute('style');
          cloned_sample.setAttribute('class','relationship')
          cloned_sample.getElementsByClassName('relationship_type')[0].innerHTML = relationship;
          cloned_sample.getElementsByClassName('relationship_type')[0].id = id+'_'+child_id+'_relationship';
          cloned_sample.getElementsByClassName('lag')[0].innerHTML = Lag;
          cloned_sample.getElementsByClassName('lag')[0].id = id+'_'+child_id+'_lag';
          cloned_sample.getElementsByClassName('relationship_main')[0].innerHTML = child_title;
          cloned_sample.getElementsByClassName('relationship_main')[0].id = id+'_'+child_id+'_activity';
          var add_relationship_button = document.getElementById("relationship_add");
          add_relationship_button.parentNode.insertBefore(cloned_sample,add_relationship_button);


        }


    }

    function relationship_title(relationship_abbr){
      //provide relationship abbr ex. FS,SS,SF,FF returns full title
      if (relationship_abbr=='FS'){
        return 'Finish Start';
      }
      else if(relationship_abbr=='SS'){
        return 'Start Start'
      }
      else if(relationship_abbr=='SF'){
        return 'Start Finish'
      }
      else if(relationship_abbr=='FF'){
        return 'Finish Finish'
      }
    }
    
    function add_values_to_selectpicker(){
      var activity_array = document.getElementsByClassName('sub_name');
      var selectpicker_tag = document.getElementsByClassName('rel_activity')[0];
      for(var i=0;i<activity_array.length;i++){
        var activity_html = activity_array[i].innerHTML;

        var activity_id = activity_array[i].id.split('_')[1];
        var option_tag = document.createElement('option');
        option_tag.setAttribute('value',activity_id);
        option_tag.innerHTML=activity_html;
        selectpicker_tag.appendChild(option_tag);
      }
      
    }

    function add_relationship(){
      var id = document.getElementById('activity_title').getAttribute('name');
      var sample = document.getElementById('relationship_sample');
      var cloned_relationship = sample.cloneNode(true);
      cloned_relationship.removeAttribute('id');
      cloned_relationship.removeAttribute('style');
      cloned_relationship.setAttribute('class','relationship')
      var select_tag = cloned_relationship.getElementsByClassName('rel_activity')[0];
      var value_array = new Array();
      var select_tag_children = select_tag.childNodes;
      for (var v=0; v<select_tag_children.length;v++){
        value_array[v]=select_tag_children[v].value;
      }

      select_tag_children[value_array.indexOf(id)].remove();
      
      if(typeof(global_child_rdata[id])!=="undefined"){
        var child_relationships_array = Object.keys(global_child_rdata[id]);;  
        for(var c=0;c<child_relationships_array.length;c++){
  
          if(value_array.indexOf(child_relationships_array[c])!==-1){
        
          select_tag_children[value_array.indexOf(child_relationships_array[c])].remove();
          }
        }
        if(typeof(global_parent_rdata[id])!=="undefined"){
          var parent_relationships_array = Object.keys(global_parent_rdata[id])
          for(var p=0;c<parent_relationships_array.length;p++){
    
            if(value_array.indexOf(parent_relationships_array[p])!==-1){
              
            select_tag_children[value_array.indexOf(parent_relationships_array[p])].remove();
          }
          }
        }

      }

      select_tag.className='selectpicker relationship_main rel_activity';
      var add_relationship_button = document.getElementById("relationship_add");
            add_relationship_button.parentNode.insertBefore(cloned_relationship,add_relationship_button);
            $('.selectpicker').selectpicker('refresh');

    }

    function submit_relationship(add_tag){
      var parent_node = add_tag.parentNode;
      var parent_id = document.getElementById('activity_title').getAttribute('name');
      var relationship_box = add_tag.parentNode;
      var relationship = relationship_box.getElementsByClassName('relationship_type')[0].value;
      var lag = relationship_box.getElementsByClassName('lag')[0].value;
      var child_id = relationship_box.getElementsByClassName('relationship_main')[1].value;
      var child_title = document.getElementById("name_"+child_id).innerHTML;

    /* Adds added values to child object*/

      var parent_content = new Object;
      parent_content['Parent_ID'] =parent_id;
      parent_content['Child_ID']=child_id;
      parent_content['Relationship'] = relationship;
      parent_content['Lag'] = lag;
      var p_content_final = new Object;
      p_content_final[parent_id]=parent_content;
      var c_content_final = new Object;
      c_content_final[child_id]=parent_content;

      if (global_child_rdata[child_id]!==undefined){
        Object.assign(global_child_rdata[child_id],p_content_final);
      }
      else{
        var new_c_content = new Object;
        new_c_content[child_id] = p_content_final;
        Object.assign(global_child_rdata,new_c_content);
      }

      if (global_parent_rdata[parent_id]!==undefined){
        Object.assign(global_parent_rdata[parent_id],p_content_final);
      }
      else{
        var new_p_content = new Object;
        new_p_content[parent_id] = c_content_final;
        Object.assign(global_parent_rdata,new_p_content);
      }


      find_if_date_changed(child_id,parent_id);

      $.post( "../PHP/add_relationship.PHP",{ project_id:window.project_id, relationship: relationship, parent_id:parseInt(parent_id),child_id:parseInt(child_id), lag:parseInt(lag)} );

      var sample = document.getElementById('submitted_relationship_sample');
      var cloned_sample = sample.cloneNode(true);
      cloned_sample.removeAttribute('id');
      cloned_sample.removeAttribute('style');
      cloned_sample.setAttribute('class','relationship')
      cloned_sample.getElementsByClassName('relationship_type')[0].innerHTML = relationship_title(relationship);
      cloned_sample.getElementsByClassName('relationship_type')[0].id = parent_id+'_'+child_id+'_relationship';
      cloned_sample.getElementsByClassName('lag')[0].innerHTML = lag;
      cloned_sample.getElementsByClassName('lag')[0].id = parent_id+'_'+child_id+'_lag';
      cloned_sample.getElementsByClassName('relationship_main')[0].innerHTML = child_title;
      cloned_sample.getElementsByClassName('relationship_main')[0].id = parent_id+'_'+child_id+'_activity';
      add_relationship_button = document.getElementById("relationship_add");
      parent_node.parentNode.removeChild(parent_node);
      add_relationship_button.parentNode.insertBefore(cloned_sample,add_relationship_button);




    }

    function date_format_MMDDYYYY(date_UTC){
      var date = date_UTC.getMonth()+1+"/"+date_UTC.getDate()+"/"+date_UTC.getFullYear();
      return date;
    }

    function date_format_YYYYMMDD(date_format_MMDDYYYY){
      // input as MM/DD/YYYY output as YYYY-MM-DD
      var date = date_format_MMDDYYYY.split("/")[1];
      if (parseInt(date)<10){
        date = "0"+date;
      }
      var month = date_format_MMDDYYYY.split("/")[0];
      if (parseInt(month)<10){
        month = "0"+month;
      }
      var year = date_format_MMDDYYYY.split("/")[2];

      var new_format = year+"-"+month+"-"+date;
      return new_format;

    }

    function convert_to_FS(relationship,lag,parent_sdate, parent_edate,child_duration){
      ///relationship must equal FS,SF,SS,FF, lag must be numeric interger, dates to be inputted in mm/dd/yyyy.
      var sdate = new Date(parent_sdate);
      var edate = new Date(parent_edate);
      var diff = sdate.getTime()-edate.getTime();
      var date_diff = diff/(1000*3600*24)+1;
      if (relationship == 'FS'){
        return parseInt(lag)+1
      }
      else if (relationship == 'SS'){
        new_lag = parseInt(lag)+date_diff;
        return new_lag
      }
      else if (relationship == 'SF'){
        new_lag = (parseInt(lag)-parseInt(child_duration)+date_diff);
        return new_lag
      }
      else if (relationship == 'FF'){
        new_lag = parseInt(lag)-parseInt(child_duration)+1;
        return new_lag
      }
    }

    function find_if_date_changed(child_activity_id,parent_activity_id){

      var original_start_date = document.getElementById('sdate_'+child_activity_id).getAttribute('name');
      //var parent_id_array = Object.keys(global_child_rdata[child_activity_id]);
      //for(var k=0; k<parent_id_array.length;k++){
        //var parent_id = parent_id_array[k];
        var parent_id = parent_activity_id;
        var relationship = global_child_rdata[child_activity_id][parent_id]['Relationship'];
        var lag = global_child_rdata[child_activity_id][parent_id]['Lag'];

      var p_sdate = document.getElementById('sdate_'+parent_id).getAttribute('name');
      var p_edate = document.getElementById('edate_'+parent_id).getAttribute('name');
      var c_duration = document.getElementById('duration_'+child_activity_id).innerHTML;
      var FS_lag = convert_to_FS(relationship,lag,p_sdate,p_edate,c_duration);
      var new_child_start =addDays(p_edate,parseInt(FS_lag));

      if (new_child_start> new Date(original_start_date)){
        change_array[change_array.length+1]=child_activity_id;
        var new_child_start =date_format_MMDDYYYY(new_child_start);
        var new_child_end = date_format_MMDDYYYY(addDays(new_child_start,parseInt(c_duration)));
        var server_date_start = date_format_YYYYMMDD(new_child_start);
        var server_date_end = date_format_YYYYMMDD(new_child_end);
        document.getElementById('sdate_'+child_activity_id).innerHTML = new_child_start;
        document.getElementById('edate_'+child_activity_id).innerHTML = new_child_end;
        document.getElementById('sdate_'+child_activity_id).setAttribute('name',new_child_start);
        document.getElementById('edate_'+child_activity_id).setAttribute('name',new_child_end);
        if (typeof(global_parent_rdata[child_activity_id])!= "undefined"){
          var changed_child_id_array = Object.keys(global_parent_rdata[child_activity_id]);
          for (var n=0;n<changed_child_id_array.length;n++){
            var changed_child_id = changed_child_id_array[n];
            find_if_date_changed(changed_child_id,child_activity_id);
          }
        }
        $.post( "../PHP/update_sub_activity.PHP",{ project_id:window.project_id,sub_id: child_activity_id, start_date:server_date_start,end_date:server_date_end} );
        return;
      }
    }

    function edit_relationship(edit_tag){

      var parent_node = edit_tag.parentNode;
      var relationship = parent_node.children[0].innerHTML;
      var lag = parent_node.children[1].innerHTML;
      var child_activity = parent_node.children[2].innerHTML;
      var child_activity_id = parent_node.children[0].id.split("_")[1];
      parent_node.parentNode.removeChild(parent_node);



      var id = document.getElementById('activity_title').getAttribute('name');
      var sample = document.getElementById('relationship_sample');
      var cloned_relationship = sample.cloneNode(true);
      cloned_relationship.removeAttribute('id');
      cloned_relationship.removeAttribute('style');
      cloned_relationship.setAttribute('class','relationship');
      
      var relationship_tag = cloned_relationship.getElementsByClassName('relationship_type')[0];

      if (relationship == "Finish Start"){
        var old_index = 'FS';
      }
      else if (relationship == "Start Finish"){
        var old_index = "SF";
      }
      else if (relationship == "Start Start"){
        var old_index = "SS";
      }
      else{
        var old_index = "FF";
      }
      relationship_tag.value = old_index;

      var lag_tag = cloned_relationship.getElementsByClassName('lag')[0];
      lag_tag.value = lag;

      var select_tag = cloned_relationship.getElementsByClassName('rel_activity')[0];
      var value_array = new Array();
      var select_tag_children = select_tag.childNodes;
      for (var v=0; v<select_tag_children.length;v++){
        value_array[v]=select_tag_children[v].value;
      }

      select_tag_children[value_array.indexOf(id)].remove();
      
      if(typeof(global_child_rdata[id])!=="undefined"){
        var child_relationships_array = Object.keys(global_child_rdata[id]);;  
        for(var c=0;c<child_relationships_array.length;c++){
  
          if(value_array.indexOf(child_relationships_array[c])!==-1){
          select_tag_children[value_array.indexOf(child_relationships_array[c])].remove();
          }
        }
        if(typeof(global_parent_rdata[id])!=="undefined"){
          var parent_relationships_array = Object.keys(global_parent_rdata[id])
          for(var p=0;c<parent_relationships_array.length;p++){
    
            if(value_array.indexOf(parent_relationships_array[p])!==-1){
            select_tag_children[value_array.indexOf(parent_relationships_array[p])].remove();
          }
          }
        }

      }
      var edit_option = document.createElement("option");
      edit_option.innerHTML = child_activity;
      edit_option.value = child_activity_id;
      select_tag.appendChild(edit_option);
      select_tag.value = child_activity_id;


      select_tag.className='selectpicker relationship_main rel_activity';
      var add_relationship_button = document.getElementById("relationship_add");
            add_relationship_button.parentNode.insertBefore(cloned_relationship,add_relationship_button);
            $('.selectpicker').selectpicker('refresh');

    }