
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
///////////////   UNDER CONSTRUCTION ////////////////////////


function notify_checkbox(e){
  if(e.value == 1){
    e.value = 0;
  }
  else{
    e.value = 1;
  }
}

function add_id_Party_Update(id){
  document.getElementById('party_form').id = id;
  return;
}


//for deleting party
function delete_party(e){
  var comfirm = confirm("Are you sure you want to delete this party?");
  if(comfirm == false){
    return;
  }
  GLOBAL_COUNTER = GLOBAL_COUNTER-1;
  var id = e.parentNode.parentNode.parentNode.parentNode.id;
  console.log(id);
  e.parentNode.parentNode.parentNode.parentNode.remove();
  $.post( "../PHP/delete_party.php",{ id: parseInt(id), project_id:window.project_id} );


}

//adds the new party id to the edit page
function add_id_Party_Input(){
  GLOBAL_COUNTER = GLOBAL_COUNTER+1;
  MAX_PARTY_ID = MAX_PARTY_ID + 1;
  document.getElementsByClassName('new_party_form')[0].id = MAX_PARTY_ID;
  return;
}


//for adding party: calls an empty edit page
function add_party(){
	//document.getElementById("party_page").style.blur = "10px";
  console.log("add parties!!!!!");
    $('#content_box').load("../HTML/testParty.html");
    setTimeout(add_id_Party_Input,500);
}

function submit_form(newFields){
  var insertHere = document.getElementById("party_bottom");
  insertHere.parentNode.insertBefore(newFields,insertHere);
  //$('#content').detach();
}



function moreFields() {
  var party_counter = MAX_PARTY_ID+1;
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


//adds the curretly updating party id to the edit page
function add_id_Party_Update(id){
  document.getElementById('party_form').id = id;
  return;
}


function morePerson(party_id) {
  console.log(party_id);
  //var count = document.getElementById(party_id).childNodes.length-6;
  var personel_span = document.getElementById(party_id).children[0].children[0].children[0].children[3];
  console.log(personel_span)
  var newFields = document.getElementById('personroot').cloneNode(true);
  newFields.id = party_id*100+personel_span.childElementCount-6+1;
  newFields.style.display = 'block';
  var newField = newFields.childNodes;
  for (var i=0;i<newField.length;i++) {
    var theName = newField[i].name
    if (theName)
      newField[i].name = theName + count;
  }
  var bottom_of_list =  personel_span.children.length-2;
  var insertHere = personel_span.children[bottom_of_list];
  var parent_node = personel_span
  console.log(parent_node);
  console.log(newFields);
  console.log(insertHere);

  parent_node.insertBefore(newFields,insertHere);
}


function count_person(this_id){
  var parent = document.getElementById(this_id);
  var length = parent.getElementsByClassName("personel-list").length;
  console.log("personel block is", length);
  return length;
}

function containsKey(object, key) {
  return !!Object.keys(object).find(k => k.toLowerCase() === key.toLowerCase());
}

function submit_person(this_id){
  var name = document.getElementById('partyname').value;
  console.log(name);
  var div_grid = document.createElement('div');
  div_grid.className = "party_card_div";
  var div_project = create_card_title(this_id, name);
  console.log("This is a test for posting id: ", this_id);

  //$.post( "../PHP/add_parties.php", { party_id: this_id, party_name: name, project_id:window.project_id});

  $.ajax({
    url : '../PHP/pull_all_registered_users.php',
    type : 'POST',     
    success:function(data){
      js_data = JSON.parse(data);
      console.log(js_data);
      console.log(email);
      
        /*for(var i = 0; i<js_data.length;i++){
          js_data[i] = js_data[i].toLowerCase();
        }
        var user_exist = data.includes(email.toLowerCase());
        if(user_exist){

        }*/
        var party_counter = MAX_PARTY_ID;
        var n = count_person(party_counter);
        var parent_element = document.getElementById(this_id).parentElement.parent_element;
        var newFields2 = document.createElement("ul");
        for(var i = 1; i <= n; i++){
          var id = party_counter*100+i;
          var insertHere = document.getElementById(id);
          var fname = insertHere.getElementsByTagName("input")[0].value;
          var lname = insertHere.getElementsByTagName("input")[1].value;
          var title = insertHere.getElementsByTagName("input")[2].value;
          var email = insertHere.getElementsByTagName("input")[3].value;
          var phone = insertHere.getElementsByTagName("input")[4].value;
          var notify = parseInt(insertHere.getElementsByTagName("input")[5].value);
          if(fname == "" ||lname == "" ||title == "" ||email == "" ){
            alert("Input cannot be empty");
            return;
          }
          else if(email!=""){
            const email_format = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            const valid = email_format.test(email);
            if(valid == false){
              alert("Input must be of email format");
              return;
            }
          }
          $.post( "../PHP/add_parties.php", { party_id: this_id, party_name: name, project_id:window.project_id});
          console.log(fname);
          var personel_field = create_card_personel(party_counter, id, fname, lname, title, email, phone, notify)
          div_project.children[0].children[0].children[1].children[0].children[1].appendChild(personel_field);
          $.post( "../PHP/add_personel.php", { personel_id: id, party_id: party_counter, personel_fname: fname, personel_lname: lname, personel_title : title, personel_email : email, personel_phone : phone, personel_notify : notify, project_id:window.project_id, action:"Add"} );
          console.log(email);
          //checking existing users and adding administry level if not assigned
          //TODO: auto email for personels noy yet registered
          console.log("registered");
          if(containsKey(js_data, email)){
            console.log(js_data[email]);
            update_user_merge(js_data[email], window.project_id);
          }
          else{
            let personel_id = project_id+'_'+id;
            $.post( "../PHP/update_unregistered_personel.php", { personel_fname: fname, personel_lname: lname, personel_email : email, personel_company: name, personel_title : title, project_id : window.project_id, action:"Add"} );
            console.log("unregistered");
            //TODO: email invitation
            var templateParams = {
              name: fname,
              email: email
          };
           
          emailjs.send('service_zkn8nva', 'template_3xuubji', templateParams, 'user_okYz0VtMf7EE7qy6o3kdw')
              .then(function(response) {
                 console.log('SUCCESS!', response.status, response.text);
              }, function(error) {
                 console.log('FAILED...', error);
              });
          }
        }
        div_grid.appendChild(div_project);
        submit_form(div_grid);
        console.log(div_grid)
        var parent_element = document.getElementById("submit_button").parentElement.parentElement.parentElement.parentElement;
        removeAllChildNodes(parent_element);
    }
    
  });
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function update_user_merge(register_id, project_id){
  console.log("updated");
  $.post( "../PHP/update_merge_from_party.php", { Register_id: register_id, Project_id: project_id} );
}

