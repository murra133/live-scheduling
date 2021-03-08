function WriteCookie(Cookie_Value_Str) {
    ///// Input is Cookie value as a string ex. input = "Cookie1=24;Cookie2=12"
    var  cookiearray = Cookie_Value_Str.split(';');

    for(var i=0;i<cookiearray.length;i++){
        document.cookie = cookiearray[i];

    }
 }

 function ReadCookie() {
     //// Np Input, Returns Array with all Cookies
    var allcookies = document.cookie;
    
    // Get all the cookies pairs in an array
    var cookiearray = allcookies.split(';');
    
    return cookiearray;
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
    input_array=[username,password];
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
    document.getElementsByClassName('firstname')[0].innerHTML = user_array[0];
    document.getElementsByClassName('lastname')[0].innerHTML = user_array[1];
    document.getElementsByClassName('email')[0].innerHTML = user_array[2];

}

///////////////////////////////////////////////////////////
function open_add_project_box(){
    document.getElementById("main_page").style.blur = "10px";
    $('#content').load("../HTML/add_new_project.html");
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





}