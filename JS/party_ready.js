GLOBAL_COUNTER = 0;
ALL_REGISTERED_USER = null;
MAX_PARTY_ID = 0;
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
        //console.log(js_data.length);
        if(js_data.length!=0){
          for (var i = 0; i < Object.keys(js_data).length; i++){
            var location = Object.keys(js_data)[i];
            var main_id = js_data[location]["PARTY_ID"];
            //console.log(main_id);
            var main_title = js_data[main_id]['PARTY_NAME'];
            var div_grid = document.createElement('div');
            div_grid.className = "party_card_div";
            var div_project = create_card_title(main_id, main_title)
            ///submit_form(div_newFields);
            var person = js_data[main_id]['PERSON_NAME'];
            var newFields2 = document.createElement("ul");
            for (var j = 0; j < Object.keys(person).length; j++){
              var person_location = Object.keys(person)[j];
              var person_id = person[person_location]['PERSON_ID'];
              var person_fname = person[person_id]['PERSON_FNAME'];
              var person_lname = person[person_id]['PERSON_LNAME'];
              var person_title = person[person_id]['TITLE'];
              var person_email = person[person_id]['EMAIL'];
              var person_phone = person[person_id]['PHONE'];
              var person_notify = person[person_id]['NOTIFY'];
              var personel_list = create_card_personel(main_id, person_id, person_fname, person_lname, person_title, person_email, person_phone, person_notify);
              console.log(div_project.children[0].children[0].children[1].children[0]);
              div_project.children[0].children[0].children[1].children[0].children[1].appendChild(personel_list);
              //console.log(div_project.children[0].children[0].children[1].children[1].children[0]);
              var add_party_block14 = document.createElement('i');
              add_party_block14.className = "far fa-plus-square clickable add_user " + main_id;
              add_party_block14.onclick = function(){add_personel(this)};
              ///submit_form(newFields2);
              if(main_id > MAX_PARTY_ID){
                MAX_PARTY_ID = parseInt(main_id);
              }
            }
            div_project.children[0].children[0].children[1].children[0].append(add_party_block14);
            div_grid.appendChild(div_project);
            submit_form(div_grid);
  
  
  
          }
          var last_id = document.getElementsByClassName("existing_parties").length
          console.log(last_id);
          GLOBAL_COUNTER = last_id;
          console.log(GLOBAL_COUNTER);

        }
    }
    
  });
});

function sortA_Z(){
  const parties = Array.from(document.getElementsByClassName('party_card_div'));
  parties.forEach(party => {
      party.remove();
  });
  window.project_id = cookie_value('project_id');

  $.ajax({
    url : '../PHP/pull_parties.php',
    type : 'POST',   
    data : 'project_id='+window.project_id,  
    success:function(data){
      var js_data = JSON.parse(data);
        //console.log(js_data.length);
        if(js_data.length!=0){
          const sortNameMap = new Map();
          for (var i = 0; i < Object.keys(js_data).length; i++){
            var location = Object.keys(js_data)[i];
            var main_id = js_data[location]["PARTY_ID"];
            //console.log(main_id);
            var main_title = js_data[main_id]['PARTY_NAME'];
            sortNameMap.set(main_id, main_title);
            //sortNameMap.set("a",3);
            //sortNameMap.set("c",4);
            //sortNameMap.set("b",1);
            //sortNameMap.set("d",2);
          }
          //Sort A-Z
          const mapSort2 = new Map([...sortNameMap.entries()].sort((a, b) => a[1].localeCompare(b[1])));
          console.log(mapSort2);
          // Map(4) {"b" => 1, "d" => 2, "a" => 3, "c" => 4}
          if(js_data.length!=0){
            for (const entry of mapSort2.entries()){
              var main_id = entry[0];
              var main_title = entry[1];
              console.log(main_id);
              var div_grid = document.createElement('div');
              div_grid.className = "party_card_div";
              var div_project = create_card_title(main_id, main_title)
              console.log(div_project);
              ///submit_form(div_newFields);
              var person = js_data[main_id]['PERSON_NAME'];
              var newFields2 = document.createElement("ul");
              for (var j = 0; j < Object.keys(person).length; j++){
                var person_location = Object.keys(person)[j];
                var person_id = person[person_location]['PERSON_ID'];
                var person_fname = person[person_id]['PERSON_FNAME'];
                var person_lname = person[person_id]['PERSON_LNAME'];
                var person_title = person[person_id]['TITLE'];
                var person_email = person[person_id]['EMAIL'];
                var personel_list = create_card_personel(main_id, person_id, person_fname, person_lname, person_title, person_email);
                console.log(div_project.children[0].children[0].children[1].children[0]);
                div_project.children[0].children[0].children[1].children[0].children[1].appendChild(personel_list);
                //console.log(div_project.children[0].children[0].children[1].children[1].children[0]);
                var add_party_block14 = document.createElement('i');
                add_party_block14.className = "far fa-plus-square clickable add_user " + main_id;
                add_party_block14.onclick = function(){add_personel(this)};
                ///submit_form(newFields2);
                if(main_id > MAX_PARTY_ID){
                  MAX_PARTY_ID = parseInt(main_id);
                }
              }
              div_project.children[0].children[0].children[1].children[0].append(add_party_block14);
              div_grid.appendChild(div_project);
              submit_form(div_grid);
    
    
    
            }
            var last_id = document.getElementsByClassName("existing_parties").length
            console.log(last_id);
            GLOBAL_COUNTER = last_id;
            console.log(GLOBAL_COUNTER);
        }
    }
  }
    
  });
}

function sortZ_A(){
  const parties = Array.from(document.getElementsByClassName('party_card_div'));
  parties.forEach(party => {
      party.remove();
  });
  window.project_id = cookie_value('project_id');

  $.ajax({
    url : '../PHP/pull_parties.php',
    type : 'POST',   
    data : 'project_id='+window.project_id,  
    success:function(data){
      var js_data = JSON.parse(data);
        //console.log(js_data.length);
        if(js_data.length!=0){
          const sortNameMap = new Map();
          for (var i = 0; i < Object.keys(js_data).length; i++){
            var location = Object.keys(js_data)[i];
            var main_id = js_data[location]["PARTY_ID"];
            //console.log(main_id);
            var main_title = js_data[main_id]['PARTY_NAME'];
            sortNameMap.set(main_id, main_title);
            //sortNameMap.set("a",3);
            //sortNameMap.set("c",4);
            //sortNameMap.set("b",1);
            //sortNameMap.set("d",2);
          }
          //Sort A-Z
          const mapSort2 = new Map([...sortNameMap.entries()].sort((a, b) => b[1].localeCompare(a[1])));
          console.log(mapSort2);
          // Map(4) {"b" => 1, "d" => 2, "a" => 3, "c" => 4}
          if(js_data.length!=0){
            for (const entry of mapSort2.entries()){
              var main_id = entry[0];
              var main_title = entry[1];
              console.log(main_id);
              var div_grid = document.createElement('div');
              div_grid.className = "party_card_div";
              var div_project = create_card_title(main_id, main_title)
              console.log(div_project);
              ///submit_form(div_newFields);
              var person = js_data[main_id]['PERSON_NAME'];
              var newFields2 = document.createElement("ul");
              for (var j = 0; j < Object.keys(person).length; j++){
                var person_location = Object.keys(person)[j];
                var person_id = person[person_location]['PERSON_ID'];
                var person_fname = person[person_id]['PERSON_FNAME'];
                var person_lname = person[person_id]['PERSON_LNAME'];
                var person_title = person[person_id]['TITLE'];
                var person_email = person[person_id]['EMAIL'];
                var personel_list = create_card_personel(main_id, person_id, person_fname, person_lname, person_title, person_email);
                console.log(div_project.children[0].children[0].children[1].children[0]);
                div_project.children[0].children[0].children[1].children[0].children[1].appendChild(personel_list);
                //console.log(div_project.children[0].children[0].children[1].children[1].children[0]);
                var add_party_block14 = document.createElement('i');
                add_party_block14.className = "far fa-plus-square clickable add_user " + main_id;
                add_party_block14.onclick = function(){add_personel(this)};
                ///submit_form(newFields2);
                if(main_id > MAX_PARTY_ID){
                  MAX_PARTY_ID = parseInt(main_id);
                }
              }
              div_project.children[0].children[0].children[1].children[0].append(add_party_block14);
              div_grid.appendChild(div_project);
              submit_form(div_grid);
    
    
    
            }
            var last_id = document.getElementsByClassName("existing_parties").length
            console.log(last_id);
            GLOBAL_COUNTER = last_id;
            console.log(GLOBAL_COUNTER);
        }
    }
  }
    
  });
}

function sort_least_recent(){
  const parties = Array.from(document.getElementsByClassName('party_card_div'));
  parties.forEach(party => {
      party.remove();
  });
  window.project_id = cookie_value('project_id');

  $.ajax({
    url : '../PHP/pull_parties.php',
    type : 'POST',   
    data : 'project_id='+window.project_id,  
    success:function(data){
      var js_data = JSON.parse(data);
        //console.log(js_data.length);
        if(js_data.length!=0){
          const sortNameMap = new Map();
          for (var i = 0; i < Object.keys(js_data).length; i++){
            var location = Object.keys(js_data)[i];
            var main_id = js_data[location]["PARTY_ID"];
            //console.log(main_id);
            var main_title = js_data[main_id]['PARTY_NAME'];
            sortNameMap.set(main_id, main_title);
            //sortNameMap.set("a",3);
            //sortNameMap.set("c",4);
            //sortNameMap.set("b",1);
            //sortNameMap.set("d",2);
          }
          if(js_data.length!=0){
            for (const entry of sortNameMap.entries()){
              var main_id = entry[0];
              var main_title = entry[1];
              console.log(main_id);
              var div_grid = document.createElement('div');
              div_grid.className = "party_card_div";
              var div_project = create_card_title(main_id, main_title)
              console.log(div_project);
              ///submit_form(div_newFields);
              var person = js_data[main_id]['PERSON_NAME'];
              var newFields2 = document.createElement("ul");
              for (var j = 0; j < Object.keys(person).length; j++){
                var person_location = Object.keys(person)[j];
                var person_id = person[person_location]['PERSON_ID'];
                var person_fname = person[person_id]['PERSON_FNAME'];
                var person_lname = person[person_id]['PERSON_LNAME'];
                var person_title = person[person_id]['TITLE'];
                var person_email = person[person_id]['EMAIL'];
                var personel_list = create_card_personel(main_id, person_id, person_fname, person_lname, person_title, person_email);
                console.log(div_project.children[0].children[0].children[1].children[0]);
                div_project.children[0].children[0].children[1].children[0].children[1].appendChild(personel_list);
                //console.log(div_project.children[0].children[0].children[1].children[1].children[0]);
                var add_party_block14 = document.createElement('i');
                add_party_block14.className = "far fa-plus-square clickable add_user " + main_id;
                add_party_block14.onclick = function(){add_personel(this)};
                ///submit_form(newFields2);
                if(main_id > MAX_PARTY_ID){
                  MAX_PARTY_ID = parseInt(main_id);
                }
              }
              div_project.children[0].children[0].children[1].children[0].append(add_party_block14);
              div_grid.appendChild(div_project);
              submit_form(div_grid);
    
    
    
            }
            var last_id = document.getElementsByClassName("existing_parties").length
            console.log(last_id);
            GLOBAL_COUNTER = last_id;
            console.log(GLOBAL_COUNTER);
        }
    }
  }
    
  });
}

function sort_most_recent(){
  const parties = Array.from(document.getElementsByClassName('party_card_div'));
  parties.forEach(party => {
      party.remove();
  });
  window.project_id = cookie_value('project_id');

  $.ajax({
    url : '../PHP/pull_parties.php',
    type : 'POST',   
    data : 'project_id='+window.project_id,  
    success:function(data){
      var js_data = JSON.parse(data);
        //console.log(js_data.length);
        if(js_data.length!=0){
          const sortNameMap = new Map();
          for (var i = Object.keys(js_data).length - 1; i >= 0 ; i--){
            var location = Object.keys(js_data)[i];
            var main_id = js_data[location]["PARTY_ID"];
            //console.log(main_id);
            var main_title = js_data[main_id]['PARTY_NAME'];
            sortNameMap.set(main_id, main_title);
            //sortNameMap.set("a",3);
            //sortNameMap.set("c",4);
            //sortNameMap.set("b",1);
            //sortNameMap.set("d",2);
          }
          if(js_data.length!=0){
            for (const entry of sortNameMap.entries()){
              var main_id = entry[0];
              var main_title = entry[1];
              console.log(main_id);
              var div_grid = document.createElement('div');
              div_grid.className = "party_card_div";
              var div_project = create_card_title(main_id, main_title)
              console.log(div_project);
              ///submit_form(div_newFields);
              var person = js_data[main_id]['PERSON_NAME'];
              var newFields2 = document.createElement("ul");
              for (var j = 0; j < Object.keys(person).length; j++){
                var person_location = Object.keys(person)[j];
                var person_id = person[person_location]['PERSON_ID'];
                var person_fname = person[person_id]['PERSON_FNAME'];
                var person_lname = person[person_id]['PERSON_LNAME'];
                var person_title = person[person_id]['TITLE'];
                var person_email = person[person_id]['EMAIL'];
                var personel_list = create_card_personel(main_id, person_id, person_fname, person_lname, person_title, person_email);
                console.log(div_project.children[0].children[0].children[1].children[0]);
                div_project.children[0].children[0].children[1].children[0].children[1].appendChild(personel_list);
                //console.log(div_project.children[0].children[0].children[1].children[1].children[0]);
                var add_party_block14 = document.createElement('i');
                add_party_block14.className = "far fa-plus-square clickable add_user " + main_id;
                add_party_block14.onclick = function(){add_personel(this)};
                ///submit_form(newFields2);
                if(main_id > MAX_PARTY_ID){
                  MAX_PARTY_ID = parseInt(main_id);
                }
              }
              div_project.children[0].children[0].children[1].children[0].append(add_party_block14);
              div_grid.appendChild(div_project);
              submit_form(div_grid);
    
    
    
            }
            var last_id = document.getElementsByClassName("existing_parties").length
            console.log(last_id);
            GLOBAL_COUNTER = last_id;
            console.log(GLOBAL_COUNTER);
        }
    }
  }
    
  });
}

function create_card_title(main_id, main_title){
  

  var add_party_block1 = document.createElement('div');
  add_party_block1.id = main_id;
  add_party_block1.className = "coontainer existing_parties";
  add_party_block1.style.display = "block";
  add_party_block1.style.width = "100%";

  var add_party_block2 = document.createElement('div');
  /*add_party_block2.className = "col-8*"*/;

  var add_party_block3 = document.createElement('div');
  add_party_block3.className = "card";
  add_party_block3.style.overflow = "auto";
  add_party_block3.style.width = "60rem";

  var party_card_header = document.createElement('div');
  party_card_header.className = "card-header tab-content";

  var add_party_block4 = document.createElement('div');
  add_party_block4.className = "card-body tab-content collapse";
  add_party_block4.id = "collapseParty_" + main_id;

  var add_party_block5 = document.createElement('h6');
  add_party_block5.className = "party_names";
  add_party_block5.style.display = "inline-block"
  add_party_block5.textContent = main_title;

  var collapse_down = document.createElement('i');
  collapse_down.className = "fas fa-caret-right clickable";
  collapse_down.onclick = function(){expand_party(collapse_down)};
  collapse_down.style.display = "inline-block";
  collapse_down.setAttribute("data-toggle", "collapse");
  collapse_down.setAttribute("data-target", "#collapseParty_" + main_id);
  collapse_down.setAttribute("aria-expanded", "true");
  collapse_down.setAttribute("aria-controls","collapseParty_" + main_id);

  var add_party_block6 = document.createElement('i');
  add_party_block6.className = "far fa-window-close clickable close_button";
  add_party_block6.onclick = function(){delete_party(add_party_block6)};
  add_party_block6.style.display = "inline-block";


  var add_party_block8 = document.createElement("form");
  add_party_block8.id = "party_form";

  var personel_header = document.createElement("div");
  personel_header.className = "personel_header";

  var fname_text = document.createElement('h4');
  fname_text.className = "personel_info_fname";
  fname_text.innerHTML = "First Name";

  var lname_text = document.createElement('h4');
  lname_text.className = "personel_info_lname";
  lname_text.innerHTML = "Last Name";

  var title_text = document.createElement('h4');
  title_text.className = "personel_info_title";
  title_text.innerHTML = "Title";

  var email_text = document.createElement('h4');
  email_text.className = "personel_info_email";
  email_text.innerHTML = "Email";

  var phone_text = document.createElement('h4');
  phone_text.className = "personel_info_phone";
  phone_text.innerHTML = "phone";

  var notify_text = document.createElement('h4');
  notify_text.className = "personel_info_notify";
  notify_text.innerHTML = "notify";


  personel_header.appendChild(fname_text);
  personel_header.appendChild(lname_text);
  personel_header.appendChild(title_text);
  personel_header.appendChild(email_text);
  personel_header.appendChild(phone_text);
  personel_header.appendChild(notify_text);

  var add_party_block9 = document.createElement('div');
  add_party_block9.className = "form-group";

  var add_party_block10 = document.createElement('h8');
  add_party_block10.textContent = "Party Personel";


  var add_party_block13 = document.createElement('span');
  add_party_block13.className = "person_field";
  
  //add_party_block9.appendChild(add_party_block10);

  add_party_block8.appendChild(personel_header);
  add_party_block8.appendChild(add_party_block9);
  add_party_block8.appendChild(add_party_block13);

  party_card_header.appendChild(collapse_down);
  party_card_header.appendChild(add_party_block5);
  party_card_header.appendChild(add_party_block6);

  add_party_block4.appendChild(add_party_block8);
  add_party_block4.appendChild(add_party_block9);

  add_party_block3.appendChild(party_card_header);
  add_party_block3.appendChild(add_party_block4);
  add_party_block2.appendChild(add_party_block3);
  add_party_block1.appendChild(add_party_block2);

  return add_party_block1;





}


function expand_party(e){
  e.className = "fas fa-caret-down clickable";
  e.onclick = function(){collapse_party(e)};
}

function collapse_party(e){
  e.className = "fas fa-caret-right clickable";
  e.onclick = function(){expand_party(e)};
}

//Add personel input field to person field
function add_personel(e){
  
    var person_info = document.createElement('div');
    person_info.className = "personel_info";

    var fname_text = document.createElement('input');
    fname_text.className = "personel_info_fname";


    var lname_text = document.createElement('input');
    lname_text.className = "personel_info_lname";

    var title_text = document.createElement('input');
    title_text.className = "personel_info_title";


    var email_text = document.createElement('input');
    email_text.className = "personel_info_email";

    var phone_text = document.createElement('input');
    phone_text.className = "personel_info_phone";

    var notify_text = document.createElement('input');
    notify_text.className = "personel_info_email";

    var notify_text = document.createElement('input');
    notify_text.className = "personel_info_notify";
    notify_text.type = "checkbox";
    notify_text.value = 0;
    notify_text.setAttribute('onclick','notify_checkbox(this);');

    var submit_button = document.createElement("i");
    submit_button.className = "far fa-plus-square clickable collapsable";
    //submit_button.type = "button";
    //submit_button.innerHTML = "submit";

    var delete_button = document.createElement("i");
    delete_button.className = "far fa-minus-square clickable collapsable";
    //delete_button.type = "button";
    //delete_button.innerHTML = "delete";
    delete_button.onclick = function(){delete_button.parentElement.remove()};

    person_info.appendChild(fname_text);
    person_info.appendChild(lname_text);
    person_info.appendChild(title_text);
    person_info.appendChild(email_text);
    person_info.appendChild(phone_text);
    person_info.appendChild(notify_text);
    person_info.appendChild(delete_button);
    person_info.appendChild(submit_button);
    var field_to_add = document.getElementById(e.parentElement.parentElement.parentElement.parentElement.parentElement.id);
   // console.log(field_to_add.children[0].children[0].children[1].children[3].children[0].children.length);
    var count = field_to_add.children[0].children[0].children[1].children[0].children[1].children.length-1;
    var proxy_id = field_to_add.children[0].children[0].children[1].children[0].children[1].children[count].id;
    //console.log(proxy_id)
    person_info.id = parseInt(proxy_id) + 1;
    field_to_add.children[0].children[0].children[1].children[0].children[1].appendChild(person_info);
    submit_button.onclick = function(){get_add_personel_info(this)};
}

function notify_checkbox(e){
  if(e.value == 1){
    e.value = 0;
  }
  else{
    e.value = 1;
  }
}

//when double clicking element turn it into input
function edit_triggered(main_id, person_id, person_text, className){
  console.log(className);
  var input = document.createElement('input');
  input.className = className;
  input.value = person_text.innerHTML;
  person_text.replaceWith(input);
  input.ondblclick = function(){submit_edit(main_id, person_id, input, className)};
}

function submit_edit(main_id, person_id, person_text, className){
  console.log(person_text);
  if(person_text.value == "" || person_text.value == null){
    alert("Input cannot be empty");
    return;
  }
  if(className == "personel_info_email"){
    const email_format = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    const valid = email_format.test(person_text.value);
    if(valid == false){
      alert("Input must be of email format");
      return;
    }
  }
    var text = document.createElement('h5');
    text.className = className;
    text.innerHTML = person_text.value;
    person_text.replaceWith(text);
    text.ondblclick = function(){edit_triggered(main_id, person_id, text, text.className)};
    console.log(main_id);
    $.post( "../PHP/add_personel.php", { 
      personel_id: person_id, 
      party_id: main_id, 
      personel_fname: text.parentElement.children[0].innerHTML, 
      personel_lname: text.parentElement.children[1].innerHTML, 
      personel_title : text.parentElement.children[2].innerHTML, 
      personel_email : text.parentElement.children[3].innerHTML, 
      personel_phone : text.parentElement.children[4].innerHTML, 
      personel_notify : text.parentElement.children[5].value, 
      project_id:window.project_id,
      action:"Update"} );
}

function delete_triggered(main_id, person_id){
  var comfirm = confirm("Are you sure you want to delete this personel?");
  if(comfirm == false){
    return;
  }
  document.getElementById(person_id).remove();
  $.post( "../PHP/delete_personel.php",{ project_id:window.project_id, party_id: main_id, personel_id: person_id} );
}


///////////////   UNDER CONSTRUCTION ////////////////////////

//adds the curretly updating party id to the edit page
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



function morePerson(party_id) {
  //console.log(party_id);
  //var count = document.getElementById(party_id).childNodes.length-6;
  var count = document.getElementById(party_id).childNodes.length-12;
  var newFields = document.getElementById('personroot').cloneNode(true);
  newFields.id = party_id*100+count;
  print("New person id", newFields.id);
  newFields.style.display = 'block';
  var newField = newFields.childNodes;
  for (var i=0;i<newField.length;i++) {
    var theName = newField[i].name
    if (theName)
      newField[i].name = theName + count;
  }
  var insertHere = document.getElementsByClassName("person_field")[0];
  var parent_node = document.getElementById(party_id);


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

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function get_add_personel_info(e){
  var new_person_input = e.parentElement;
  var party_id = e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
  var person_id = new_person_input.id;
  var person_fname = new_person_input.getElementsByClassName('personel_info_fname')[0].value;
  var person_lname = new_person_input.getElementsByClassName('personel_info_lname')[0].value;
  var person_title = new_person_input.getElementsByClassName('personel_info_title')[0].value;
  var person_email = new_person_input.getElementsByClassName('personel_info_email')[0].value;
  var person_phone = new_person_input.getElementsByClassName('personel_info_phone')[0].value;
  var person_notify = new_person_input.getElementsByClassName('personel_info_notify')[0].value;

  if(person_fname == "" ||person_lname == "" ||person_title == "" ||person_email == "" ||person_phone == ""){
    alert("Input cannot be empty");
    return;
  }
  else if(person_email!=""){
    const email_format = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    const valid = email_format.test(person_email);
    if(valid == false){
      alert("Input must be of email format");
      return;
    }
  }
  
  var new_person = create_card_personel(party_id, person_id, person_fname, 
                                        person_lname, person_title, person_email, 
                                        person_phone, person_notify);
  console.log(new_person);
  document.getElementById(person_id).replaceWith(new_person);
  $.post( "../PHP/add_personel.php", { personel_id: person_id, party_id: party_id, 
                                       personel_fname: person_fname, personel_lname: person_lname, 
                                       personel_title : person_title, personel_email : person_email, 
                                       personel_phone : person_phone, personel_notify : person_notify, 
                                       project_id:window.project_id, action:"Add"} );

}

function create_card_personel(main_id, person_id, person_fname, person_lname, person_title, person_email, person_phone, person_notify){
 var person_info = document.createElement('div');
 person_info.id = person_id;
 person_info.className = "personel_info";

 var fname_text = document.createElement('h5');
 fname_text.className = "personel_info_fname";
 fname_text.innerHTML = person_fname;
 fname_text.ondblclick = function(){edit_triggered(main_id, person_id, fname_text, fname_text.className)};
 //name_text.readOnly = true;

 var lname_text = document.createElement('h5');
 lname_text.className = "personel_info_lname";
 lname_text.innerHTML = person_lname;
 lname_text.ondblclick = function(){edit_triggered(main_id, person_id, lname_text, lname_text.className)};

 var title_text = document.createElement('h5');
 title_text.className = "personel_info_title";
 title_text.innerHTML = person_title;
 title_text.ondblclick = function(){edit_triggered(main_id, person_id, title_text, title_text.className)};


 var email_text = document.createElement('h5');
 email_text.className = "personel_info_email";
 email_text.innerHTML = person_email;
 email_text.ondblclick = function(){edit_triggered(main_id, person_id, email_text, email_text.className)};

 var phone_text = document.createElement('h5');
 phone_text.className = "personel_info_phone";
 phone_text.innerHTML = person_phone;
 phone_text.ondblclick = function(){edit_triggered(main_id, person_id, phone_text, phone_text.className)};

 var notify_text = document.createElement('input');
 notify_text.className = "personel_info_notify";
 notify_text.type = "checkbox";

 console.log(person_notify)
 if(person_notify==1){
   console.log("yesss")
   notify_text.checked = 1;
   notify_text.disabled = 1;
   notify_text.value = 1;
 }
 else{
  notify_text.disabled = 1;
  notify_text.value = 0;
 }



 var delete_button = document.createElement("i");
 delete_button.className = "far fa-minus-square clickable collapsable";
 //delete_button.type = "button";
 //delete_button.innerHTML = "delete";
 delete_button.onclick = function(){delete_triggered(main_id, person_id)}

 person_info.appendChild(fname_text);
 person_info.appendChild(lname_text);
 person_info.appendChild(title_text);
 person_info.appendChild(email_text);
 person_info.appendChild(phone_text);
 person_info.appendChild(notify_text);
 person_info.appendChild(delete_button);
  return person_info;


}

function update_user_merge(register_id, project_id){
  console.log("updated");
  $.post( "../PHP/update_merge_from_party.php", { Register_id: register_id, Project_id: project_id} );
}

function search_party() { 
  let input = document.getElementById('searchbar').value;
  input=input.toLowerCase(); 
  if(input==''){
    for(var x = 0; x < parties.length; x++){
      parties[x].style.display = "inline-block";
    }
    return
  }
  let party_name = document.getElementsByClassName('party_names'); 
  let first_name = document.getElementsByClassName('personel_info_fname'); 
  let last_name = document.getElementsByClassName('personel_info_fname'); 
  let parties = document.getElementsByClassName('party_card_div');
  for(var x = 0; x < parties.length; x++){
    parties[x].style.display = "none";
  }
  for(var i = 0; i < party_name.length; i++){
    if(party_name[i].innerHTML.includes(input)){
      party_name[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "inline-block";
    }
  }
  for(i = 0; i < first_name.length; i++){
    if(first_name[i].innerHTML.includes(input)){
      first_name[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "inline-block";
    }
  } 
  for(i = 0; i < last_name.length; i++){
    if(last_name[i].innerHTML.includes(input)){
      last_name[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "inline-block";
    }
  } 
} 

function add_function_to_search(function_call){
  var search_tag =document.getElementById('searchbar');
  search_tag.setAttribute('onkeyup',function_call);
  var search_title = document.getElementById("search_bar_title");
  search_title.innerHTML += " Party";
};
