function tableData() {
	var userName;
	var userURL ;
	fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then(
	  /*.then((response) => response.json())
	  .then((json) => console.log(json));*/
		res=>{
			res.json().then(
				data=>{
					console.log(data);
					if(data.length > 0){
						var temp = "";		
						
						//--start for loop							
						data.forEach((u)=>{						
							userName = "";
							
							userURL = 'https://jsonplaceholder.typicode.com/users?id='+u.userId;
							fetch(userURL).then(
								res=>{
									res.json().then(
										data=>{
											console.log(data);
											if(data.length > 0){												
												//--start for loop	
												data.forEach((u2)=>{
												userName = u2.name;												
												//alert(userName);
												})
												//--close for loop
												document.getElementById("userName").value = userName;	
											}
										}
									)	
								}
							)	
							//alert(document.getElementById("userName").value);
							userName = document.getElementById("userName").value;
							temp +="<tr>";
							//Var paramaString = "'"+u.id+"','"+userName+"','"+u.title+"','"+u.completed+"'";
							temp +="<td><a onclick='openTicketDetails(&#39;"+u.id+"&#39;&#44;&#39;"+userName+"&#39;&#44;&#39;"+u.title+"&#39;&#44;&#39;"+u.completed+"&#39;)' href='javascript:void(0);'>"+u.id+"</a></td>";
							temp +="<td>"+userName+"</td>";
							temp +="<td>"+u.title+"</td>";
							temp +="<td>"+u.completed+"</td></tr>";								
						})
						//--close for loop
						document.getElementById("data").innerHTML = temp;
					}
				}
			)		
		}
	)
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

var popup;
function openTicketDetails(input_id, input_name, input_title, input_complete) {
	var id = input_id;
	var name = input_name;
	var title = input_title;
	var completed = input_complete;
	popup = window.open("record_popup.html?readonlyID="+id+"&inputName="+name+"&inputTitle="+title+"&inputCompleted="+completed, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=800,height=300");
	popup.focus();
	
}

function saveData() {
	
	self.close();
	window.opener.reload();
}

function deleteData() {
	
	self.close();
	window.onbeforeunload = RefreshParent;
}

function RefreshParent() {
	if (window.opener != null && !window.opener.closed) {
		window.opener.location.reload();
	}
}

function openNewTicket() {
	popup = window.open("new_popup.html", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=800,height=300");
	popup.focus();	
}

function saveNewData() {
	
	self.close();
	window.onbeforeunload = RefreshParent;
}


function productsAdd(name, title, completed, number) {
		self.close();
        // First check if a <tbody> tag exists, add one if not
        if ($("#myTable tbody").length == 0) {
            $("#myTable").append("<tbody></tbody>");
        }
        
        // Append product to the table
        $("#myTable tbody").append("<tr>" +
			"<td>"+number+"</td>" +
            "<td>"+name+"</td>" +
            "<td>"+title+"</td>" +
            "<td>"+completed+"</td>" +
            "</tr>");
		sleep(1000);	
}

function closeNewTicket() {
	self.close();
}



function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}



        