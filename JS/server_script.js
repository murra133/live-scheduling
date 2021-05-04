function ReadCookie() {
    //// Np Input, Returns Array with all Cookies
   var allcookies = document.cookie;
   
   // Get all the cookies pairs in an array
   var cookiearray = allcookies.split(';');
   
   return cookiearray;
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

function close_button(){
    removeAllChildNodes(document.getElementById('content_box'));
    $('#main_page').removeAttr('style');


}

function pull_all_schedules(){
    var all_cookies = ReadCookie();
    for(var n=0; n<all_cookies.length;n++){
        cookies_variable_array[n]=all_cookies[n].split("=")[0].trim();
    }
    var register_id = all_cookies[cookies_variable_array.indexOf('Registry_ID')].split('=')[1];
    
    $.ajax({
        type: "POST",
        url: "../PHP/pull_project.php",
        data: 'register_id='+register_id,
        success: function(data){
            var js_data = JSON.parse(data);
            for(var i=0;i<Object.keys(js_data).length;i++){
                var project_id = Object.keys(js_data)[i];
                var user_name = js_data[project_id][0];
                var project_name = js_data[project_id][1];
                var schedule_line = document.getElementById('sample_line');
                var cloned_schedule_line = schedule_line.cloneNode(true);
                cloned_schedule_line.getElementsByTagName('h3')[0].innerHTML = project_name;
                cloned_schedule_line.getElementsByTagName('h3')[0].id = "schedule_"+project_id;
                cloned_schedule_line.getElementsByTagName('h3')[1].innerHTML= user_name;
                cloned_schedule_line.getElementsByTagName('h3')[1].id= "administrator_"+project_id;
                cloned_schedule_line.getElementsByTagName('span')[0].id= project_id;
                cloned_schedule_line.removeAttribute('style');
                cloned_schedule_line.removeAttribute('id');
                var add_project_button = document.getElementById("add_project");
                add_project_button.parentNode.insertBefore(cloned_schedule_line,add_project_button);

            }
        }
});
    }

function WriteCookie(Cookie_Value_Str) {
    ///// Input is Cookie value as a string ex. input = "Cookie1=24;Cookie2=12"
    var  cookiearray = Cookie_Value_Str.split(';');

    for(var i=0;i<cookiearray.length;i++){
        document.cookie = cookiearray[i];

    }
 }


//////////////////////////////////////////////////////////////////
function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    return (false)
}
//////////////////////////////////////////////////////////////////////
function pull_user_write_cookie(username_password){
    $.ajax({
        url : '../PHP/pull_user.php?username='+username_password[0]+'&password='+username_password[1],
        type : 'GET',     
        success:function(data){
          if (JSON.parse(data)==null){
            document.getElementById("message").innerHTML = "Username or Password is Incorrect";
          }
          else{
            var js_data = JSON.parse(data);
            var cookie ="login_status=1;Registry_ID="+js_data['Register_id']+";username="+username_password[0];
            WriteCookie(cookie);
            window.location.replace("../HTML/project_schedule_view.html");
          }

        }
    })
}
//////////////////////////////////////////////////////////////////////////////
function submit_register(action){

    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;


    if(action == 'sign_up'){
        var firstName=document.getElementById("first_name").value;
        var lastName=document.getElementById("last_name").value;
        var email=document.getElementById("email").value;
        var company=document.getElementById("company").value;
        var title=document.getElementById("title").value;
        var c_password=document.getElementById("confirm_p").value;

        if(firstName==""){
            document.getElementById("message").innerHTML = "First Name Value Is Missing";
            return false;
        }
        else if (lastName==""){
            document.getElementById("message").innerHTML = "Last Name Value Is Missing";
            return false;
        }
        else if (username==""){
            document.getElementById("message").innerHTML = "Username Value Is Missing";
            return false;
        }
        else if (email==""){
            document.getElementById("message").innerHTML = "Email Value Is Missing";
            return false;
        }
        else if (ValidateEmail(email)==false){
            document.getElementById("message").innerHTML = "Email is Invalid";
            return false;
        }
        else if (company==""){
            document.getElementById("message").innerHTML = "Company Value Is Missing";
            return false;
        }
        else if (password==""){
            document.getElementById("message").innerHTML = "Password Value Is Missing";
            return false;
        }
        else if (password!=c_password){
            document.getElementById("message").innerHTML = "Passwords Do Not Match";
            return false;
        }

        document.getElementById("message").innerHTML = "";
        $.post( "../PHP/user_register.php",{ firstName: firstName, lastName:lastName,username:username,company:company,title:title,email:email,password:password} );
    }
    var input_array=[username,password];
    console.log(input_array);
    setInterval(pull_user_write_cookie,300,input_array)
    

}
////////////////////////////////////////////////////////////////////////////////////////////////
function add_admin_input(admin_add_tag){
    var user_admin_tag = document.getElementById("sample_input");
    console.log(user_admin_tag);
    var cloned_input_tag = user_admin_tag.cloneNode(true);
    cloned_input_tag.removeAttribute('id');
    cloned_input_tag.removeAttribute('style');
    admin_add_tag.parentNode.insertBefore(cloned_input_tag, admin_add_tag);

}
////////////////////////////////////////////////////////////////////////////////////////////////
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////
function delete_user_admin_input(delete_tag){
    var parent_node = delete_tag.parentNode;
    removeAllChildNodes(parent_node);

}

//////////////////////////////////////////////////////////////////////////////
function add_user_to_project_box(user_array){
    ///// var user_array = [first_name, last_name, email];
    document.getElementsByClassName('firstname')[1].innerHTML = user_array[0];
    document.getElementsByClassName('firstname')[1].setAttribute('value',user_array[0]);
    document.getElementsByClassName('lastname')[1].setAttribute('value',user_array[1]);
    document.getElementsByClassName('lastname')[1].innerHTML = user_array[1];
    document.getElementsByClassName('email')[1].setAttribute('value',user_array[2]);
    document.getElementsByClassName('email')[1].innerHTML = user_array[2];


}

///////////////////////////////////////////////////////////
function open_add_project_box(){
    document.getElementById("main_page").style.blur = "10px";
    $('#content_box').load("../HTML/add_new_project.html");
    $("#main_page").css({
      "-webkit-filter": "blur(3px)", 
      "-moz-filter": "blur(3px)", 
      "-o-filter": "blur(3px)", 
      "-ms-filter": "blur(3px)", 
      "filter": "blur(3px)", 
    }
  );
  var cookiearray = ReadCookie();
  for(var n=0; n<cookiearray.length;n++){
    cookies_variable_array[n]=cookiearray[n].split("=")[0].trim();
}
var first_name = cookiearray[cookies_variable_array.indexOf('fname')].split("=")[1];
var last_name = cookiearray[cookies_variable_array.indexOf('lname')].split("=")[1];
var email = cookiearray[cookies_variable_array.indexOf('email')].split("=")[1];

user_array = [first_name,last_name,email];
setTimeout(add_user_to_project_box,150,user_array);
}

function create_project(submit_button_tag){
    document.getElementById("message").innerHTML = "";
    var project_name = document.getElementById("add_project_input").value;
    if (project_name==""){
        document.getElementById("message").innerHTML = "Please Input a Title for the Project";
        return false;
    }
    console.log(project_name);
    ///Input arrays////
    var tag_fname_array = document.getElementsByClassName('firstname');
    //fname_array.splice(0,1);
    var tag_lname_array = document.getElementsByClassName('lastname');
    //lname_array.splice(0,1);
    var tag_email_array = document.getElementsByClassName('email');
    //email_array.splice(0,1);
    var tag_admin_level_array = document.getElementsByClassName('admin_level');
    var fname_array = Array();
    var lname_array = Array();
    var email_array = Array();
    var admin_level_array = Array();
    fname_array[0] = tag_fname_array[1].getAttribute('value')
    lname_array[0] = tag_lname_array[1].getAttribute('value');
    email_array[0] = tag_email_array[1].getAttribute('value');
    admin_level_array[0] = tag_admin_level_array[1].getAttribute('value');
    var n=1;
    //admin_level.splice(0,1);
    for(var i = 2; i<tag_email_array.length;i++){

        fname_array[n] = tag_fname_array[i].value;
        lname_array[n] = tag_lname_array[i].value;
        email_array[n] = tag_email_array[i].value;
        admin_level_array[n] = tag_admin_level_array[i].value;
        n++;
    }

    //Check to see if all paraemters are inputted//
    for(var k = 1; k<fname_array.length;k++){
        var line = k+1;
        console.log(k);
        console.log(line);
        console.log(fname_array);
        if (fname_array[k]==""||lname_array[k]==""||email_array[k]==""){
            document.getElementById("message").innerHTML = "Parameters on Administrator Line "+line+" are missing";
            return false;
        }
        else if(ValidateEmail(email_array[k])==false){
            console.log('running');
            document.getElementById("message").innerHTML = "Email on Administrator Line "+line+" is not in Email format";
            return false;
        };
    }

    var post_fname = fname_array.join();
    var post_lname = lname_array.join();
    var post_email = email_array.join();
    var post_admin_level = admin_level_array.join();

    $.ajax({
        type: "POST",
        url: "../PHP/create_project.php",
        data: 'project_name='+project_name+"&first_name="+post_fname+"&last_name="+post_lname+"&email="+post_email+"&admin_level="+post_admin_level,
        success: function(data){
            var js_data = JSON.parse(data);
            console.log(js_data);
            var project_id = js_data;
            var schedule_line = document.getElementById('sample_line');
            var cloned_schedule_line = schedule_line.cloneNode(true);
            cloned_schedule_line.getElementsByTagName('h3')[0].innerHTML = project_name;
            cloned_schedule_line.getElementsByTagName('h3')[0].id = "schedule_"+project_id;
            cloned_schedule_line.getElementsByTagName('h3')[1].innerHTML= fname_array[0]+" "+lname_array[0];
            cloned_schedule_line.getElementsByTagName('h3')[1].id= "administrator_"+project_id;
            cloned_schedule_line.getElementsByTagName('span')[0].id= project_id;
            cloned_schedule_line.removeAttribute('style');
            cloned_schedule_line.removeAttribute('id');
            var add_project_button = document.getElementById("add_project");
            add_project_button.parentNode.insertBefore(cloned_schedule_line,add_project_button);
        }
     });
     var content = document.getElementById('content_box');
     removeAllChildNodes(content);
     $('#main_page').removeAttr('style');
     return false;

}

function Write_id_Cookie(tag_with_id){
    var id = tag_with_id.id;
    var name = document.getElementById('schedule_'+id).innerHTML;
    var cookie = 'project_id='+id+';project_name='+name;
    WriteCookie(cookie);
    var url = "../HTML/header.html"
    window.location.href = url;


}

function login_check(){
    var status = cookie_value('login_status');
    if (status == 1){
        return;
    }
    else{
        window.location.replace("../HTML/index.html");

    }
}
function eraseCookie() {
    var res = document.cookie;
    var multiple = res.split(";");
    for(var i = 0; i < multiple.length; i++) {
       var key = multiple[i].split("=");
       document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
    }
 }
function logout(){
   eraseCookie();
   window.location.replace("../HTML/index.html");
   return;
}

///////////////////////////////////////////////////////////////////////////