function add_party(){
	//document.getElementById("main_page").style.blur = "10px";
    $('#content').load("../HTML/add_party_personel.html");
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
  var party_counter = document.getElementsByClassName("party_name").length;
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
  newFields.getElementsByTagName("h3")[0].innerHTML = name;
  var insertHere = document.getElementById(this_id);
  insertHere.replaceWith(newFields);
  $.post( "../PHP/add_parties.php", { party_id: this_id, party_name: name} );

}

function count_person(this_id){
  var parent = document.getElementById(this_id);
  var length = parent.getElementsByTagName('div').length;
  return length/2-1;
}

function submit_person(this_id){
  var party_counter = document.getElementsByClassName("party_name").length-1;
  var n = count_person(party_counter);
  console.log(n);
  var parent_element = this_id.parentElement;
  var pname = parent_element.getElementsByTagName("h3")[0];
  submit_form(pname);
  for(var i = 1; i <= n; i++){
    var id = party_counter*100+i;
    var insertHere = document.getElementById(id);
    var fname = insertHere.getElementsByTagName("input")[0].value;
    var lname = insertHere.getElementsByTagName("input")[1].value;
    var title = insertHere.getElementsByTagName("input")[2].value;
    var email = insertHere.getElementsByTagName("input")[3].value;
    var newFields = document.getElementById("person_submitted").cloneNode(true);
    newFields.id = party_counter*100+i;
    newFields.style.display = 'block';
    newFields.getElementsByTagName("span")[0].innerHTML = fname;
    newFields.getElementsByTagName("span")[1].innerHTML = lname;
    newFields.getElementsByTagName("span")[2].innerHTML = title;
    newFields.getElementsByTagName("span")[3].innerHTML = email;
    submit_form(newFields);
    $.post( "../PHP/add_personel.php", { personel_id: id, party_id: party_counter, personel_fname: fname, personel_lname: lname, personel_title : title, personel_email : email} );
  }
  removeAllChildNodes(parent_element);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}