// ------ Brian's JavaScript------//

function parseHTML(fileName) {
    console.log("Running");
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = fileName;
      if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            console.log("Running");
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /*remove the attribute, and call this function once more:*/
            parseHTML();
          }
        }      
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
      }
    }
  };



function three_week_ahead(){
  var n;
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  console.log(today);
  for(n=0;n<21;n++) {
    console.log(dd);
    console.log(mm);
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
    console.log(dd);

    if(ndd<10) 
    {
        ndd='0'+ndd;
    }     
    if(nmm<10) 
    {
        nmm='0'+nmm;
    } 

        document.write('<h3 class="date">'+nmm+'/'+ndd+'</h3>');
        dd= dd+1;
  }

  };