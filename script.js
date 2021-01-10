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
  for(n=0;n<21;n++) {

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

  function add_main_activity(){
    var add_cell = document.getElementById('added_cell');
    var n =add_cell.children.length;
    n=n+1;
    console.log(n);
    var div = document.createElement('div');
    div.setAttribute("id",n);
    div.setAttribute("class","main_activity");
    var form=document.createElement('form')
    form.setAttribute("method","post");
    var inp = document.createElement('input');
    inp.setAttribute("type","text");
    inp.setAttribute("class","main_activity_input");
    inp.setAttribute("name","main_activity"+n);
    var submit = document.createElement("div");
    submit.setAttribute("type","submit");
    submitchild = document.createElement("i");
    submitchild.setAttribute("class","fa fa-check-square")
    submitchild.setAttribute("onclick","change_input_to_title(this)")
    rejectchild = document.createElement("i");
    rejectchild.setAttribute("class","fa fa-times-circle-o")
    var subadd=document.createElement('div');
    subadd.setAttribute("class","sub_activity_add");
    subadd.setAttribute("onclick","add_sub_activity()");
    var subaddtwo=document.createElement("i");
    subaddtwo.setAttribute("class","far fa-plus-square");
    subadd.appendChild(subaddtwo);
    submit.appendChild(submitchild);
    submit.appendChild(rejectchild)
    form.appendChild(inp);
    form.appendChild(submit);
    div.appendChild(form)
    div.appendChild(subadd);
    add_cell.appendChild(div);
  };


  function change_input_to_title(this_element){
    var input_parent= this_element.parentElement.parentElement;
    var input_value= input_parent.children[0].value;
    console.log(input_parent)
    var main_div=input_parent.parentElement;
    console.log("main_div="+main_div)
    var subadd=main_div.lastChild;
    console.log(subadd)
    var title = document.createElement("h2");
    title.innerHTML=input_value;
    for (i=0;i<main_div.children.length;i++) {
      child=main_div.children[i];
      main_div.removeChild(child);
    }
    
    main_div.appendChild(title);
    main_div.appendChild(subadd);
    

  }