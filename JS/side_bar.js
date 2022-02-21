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

function update_project_name(){
	console.log('running two')
	var project_name = cookie_value('project_name');
	console.log (project_name);
	document.getElementById("project_name").firstChild.innerHTML = project_name;  
	document.getElementById("search_bar_title").innerHTML = project_name;  
};

(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();


})(jQuery);

function toggle_side_bar(){
	console.log("running");
	var side_bar = document.getElementById("sidebarCollapse")
	var main_page = document.getElementById("main_page")
	var navbar = document.getElementById("search_navbar")
	if (side_bar.getAttribute('class')=='btn btn-primary'){
		side_bar.setAttribute('class','btn btn-primary active')

		if (navbar!=undefined){
			navbar.setAttribute('class','active')

		}
		if (main_page!=undefined){
			main_page.setAttribute('class','active')
		}
		
	}
	else{
	  side_bar.setAttribute('class','btn btn-primary')

	  if (navbar!=undefined){
		navbar.removeAttribute('class')
	}
	if (main_page!=undefined){
		main_page.removeAttribute('class')
	}


	}
  $('#sidebar').toggleClass('active');

};





