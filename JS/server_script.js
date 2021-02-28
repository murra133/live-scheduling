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

function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    return (false)
}

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