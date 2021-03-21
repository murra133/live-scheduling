GLOBAL_COUNTER = 0;

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

$( document ).ready(function() {
  window.project_id = cookie_value('project_id');
  $.ajax({
    url : '../PHP/pull_parties.php',
    type : 'POST',   
    data : 'project_id='+window.project_id,  
    success:function(data){
      var js_data = JSON.parse(data);
        console.log(js_data.length);
        if(js_data.length!=0){
          for (var i = 0; i < Object.keys(js_data).length; i++){
            var location = Object.keys(js_data)[i];
            var main_id = js_data[location]["PARTY_ID"];
            console.log(main_id);
            var main_title = js_data[main_id]['PARTY_NAME'];
            var div_grid = document.createElement('div');
            div_grid.className = "col-sm-2";
            var div_project = create_card_title(main_id, main_title)
            ///submit_form(div_newFields);
            var person = js_data[main_id]['PERSON_NAME'];
            var newFields2 = document.createElement("ul");
            for (var j = 0; j < Object.keys(person).length; j++){
              var person_location = Object.keys(person)[j];
              var person_id = person[person_location]['PERSON_ID'];
              var person_fname = person[person_id]['PERSON_FNAME'];
              var person_lname = person[person_id]['PERSON_LNAME'];
              newFields2.id = person_id;
              newFields2.className = 'personel_box list-group list-group-flush';
              newFields2.style.display = 'block';
              var item = document.createElement('li');
              item.className = "list-group-item";
              item.innerHTML = person_fname + " " + person_lname;
              newFields2.appendChild(item);
              console.log(newFields2);
              div_project.appendChild(newFields2);
              ///submit_form(newFields2);
            }
            console.log(div_project);
            div_grid.appendChild(div_project);
            submit_form(div_grid);
  
  
  
          }
          GLOBAL_COUNTER = parseInt(main_id);

        }
    }
    
  });
});


function create_card_title(main_id, main_title){
  var div_project = document.createElement('div');
  div_project.className = "card overflow-auto";
  var newFields = document.createElement('h2');
  newFields.id = main_id;
  newFields.className = "party_name";
  newFields.className = "card-header"
  newFields.innerHTML = main_title;
  div_project.id = "div"+main_id;
  var div_newFields = document.createElement('div');
  div_newFields.className = "project_title";

  var edit = document.createElement("i");
  edit.setAttribute("class","fas fa-edit main_edit title");
  edit.setAttribute("id","edit_"+main_id);
  edit.setAttribute("onclick","update_project(this)")
  
  var delete_button= document.createElement("i");
  delete_button.setAttribute("class","far fa-minus-square main_delete title");
  delete_button.setAttribute("id","delete_"+main_id);
  delete_button.setAttribute("onclick","delete_project(this)")

  newFields.appendChild(edit);
  newFields.appendChild(delete_button);
  
  div_newFields.appendChild(newFields);
  console.log(div_newFields);
  div_project.appendChild(div_newFields);
  return div_project;
}

function delete_project(e){
  var id = e.parentNode.id;
  e.parentNode.parentNode.parentNode.parentNode.remove();
  $.post( "../PHP/delete_party.php",{ id: parseInt(id), project_id:window.project_id} );


}




function add_party(){
	//document.getElementById("main_page").style.blur = "10px";
    $('#content_box').load("../HTML/add_party_personel.html");
}

function cancel_party_form(){
  //$('#content').detach();
   
}

function submit_form(newFields){
  var insertHere = document.getElementById("party_bottom");
  insertHere.parentNode.insertBefore(newFields,insertHere);
  //$('#content').detach();
}


function moreFields() {
  var party_counter = GLOBAL_COUNTER+1;
  var newFields = document.getElementById('readroot').cloneNode(true);
  newFields.id = party_counter;
  newFields.style.display = 'block';
  newFields.class = 'box';
  var newField = newFields.childNodes;
  for (var i=0;i<newField.length;i++) {
    var theName = newField[i].name
    if (theName)
      newField[i].name = theName + party_counter;
  }
  var insertHere = document.getElementById('writeroot');
  insertHere.parentNode.insertBefore(newFields,insertHere);
}



function morePerson(party_id) {
  console.log(party_id);
  var count = document.getElementById(party_id).childNodes.length-6;
  var newFields = document.getElementById('personroot').cloneNode(true);
  newFields.id = party_id*100+count;
  newFields.style.display = 'block';
  var newField = newFields.childNodes;
  for (var i=0;i<newField.length;i++) {
    var theName = newField[i].name
    if (theName)
      newField[i].name = theName + count;
  }
  var insertHere = document.getElementsByClassName("person_field")[party_id];
  var parent_node = document.getElementById(party_id);
  parent_node.insertBefore(newFields,insertHere);
}

function submit_party(this_id){
  var insertHere = document.getElementById(this_id);
  var name = insertHere.getElementsByTagName("input")[0].value;
  var newFields = document.getElementById("party_submitted").cloneNode(true);
  newFields.id = this_id;
  newFields.style.display = 'block';
  newFields.getElementsByTagName("h2")[0].innerHTML = name;
  var insertHere = document.getElementById(this_id);
  insertHere.replaceWith(newFields);
  $.post( "../PHP/add_parties.php", { party_id: this_id, party_name: name, project_id:window.project_id});

}

function count_person(this_id){
  var parent = document.getElementById(this_id);
  var length = parent.getElementsByTagName('div').length;
  return length/2-1;
}

function submit_person(this_id){
  console.log(GLOBAL_COUNTER)
  var party_counter = GLOBAL_COUNTER+1;
  var n = count_person(party_counter);
  console.log(n);
  var parent_element = this_id.parentElement;
  var pname = parent_element.getElementsByTagName("h2")[0];
  submit_form(pname);
  for(var i = 1; i <= n; i++){
    var id = party_counter*100+i;
    var insertHere = document.getElementById(id);
    var fname = insertHere.getElementsByTagName("input")[0].value;
    var lname = insertHere.getElementsByTagName("input")[1].value;
    var title = insertHere.getElementsByTagName("input")[2].value;
    var email = insertHere.getElementsByTagName("input")[3].value;
    console.log(fname);
    var newFields = document.getElementById("person_submitted").cloneNode(true);
    newFields.id = party_counter*100+i;
    newFields.style.display = 'block';
    newFields.getElementsByTagName("h5")[0].innerHTML = fname;
    newFields.getElementsByTagName("h5")[1].innerHTML = lname;
    newFields.getElementsByTagName("h5")[2].innerHTML = title;
    newFields.getElementsByTagName("h5")[3].innerHTML = email;
    submit_form(newFields);
    $.post( "../PHP/add_personel.php", { personel_id: id, party_id: party_counter, personel_fname: fname, personel_lname: lname, personel_title : title, personel_email : email, project_id:window.project_id} );
  }
  removeAllChildNodes(parent_element);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function search_party() { 
  let input = document.getElementById('searchbar').value;
  input=input.toLowerCase(); 
  let x = document.getElementsByClassName('project_title'); 
  let y = document.getElementsByClassName('personel_box'); 
    
  /*for (i = 0; i < x.length; i++) {  
      console.log(x[i].childNodes[0].childNodes[0]);
  } */

  for (var i = 0; i < x.length; i++) {  
    if(input==""){
      x[i].parentElement.parentElement.style.display="inline-block";
    }
    else if (!x[i].childNodes[0].childNodes[0].textContent.toLowerCase().includes(input)) { 
        x[i].parentElement.parentElement.style.display="none"; 
    } 
    else { 
        x[i].parentElement.parentElement.style.display="inline-block";                  
    } 
  } 

  for (var j = 0; j < y.length; j++){
    if (y[j].childNodes[0].textContent.toLowerCase().includes(input)){
      y[j].parentElement.parentElement.style.display="inline-block"; 
    }
  }
} 

function add_function_to_search(function_call){
  console.log('runningkjkjk');
  var search_tag =document.getElementById('searchbar');
  search_tag.setAttribute('onkeyup',function_call);
};