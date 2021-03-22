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
    $.ajax({
      url : '../PHP/pull_parties.php',
      type : 'POST', 
      data : 'project_id='+window.project_id,  
      success:function(data){
        var js_data = JSON.parse(data);
          console.log(js_data);
          for (var i = 0; i < Object.keys(js_data).length; i++){
            var div_grid = document.createElement('div');
            var div_project = document.createElement('div');
            div_grid.className = "col-sm-2";
            div_project.className = "card overflow-auto";
            var location = Object.keys(js_data)[i];
            var main_id = js_data[location]["PARTY_ID"];
            var main_title = js_data[main_id]['PARTY_NAME'];
            var party_list = document.getElementById("party_involved_box");
            var party_option = document.createElement("option");
            party_option.value = main_title;
            party_option.innerHTML = main_title;
            party_list.appendChild(party_option);

            
              ///submit_form(newFields2);
            }

  
  
          }
      
    });
  });