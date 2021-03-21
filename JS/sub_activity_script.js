$( document ).ready(function() {
    $.ajax({
      url : '../PHP/pull_parties.php',
      type : 'POST',     
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