

//Jquery version

$(document).ready(function () {		
	    var interval = 50;   // ms per call   
	    var refresh = function() {
	        $.ajax({
	            url: "http://localhost:8080/robot/RobotResponse",
	            cache: false,	            
	            crossDomain:false,	            
	            success: function(result) {	            		            	
	                $("#coord").html("X: "+result.X+",Y: "+result.Y+",Z: "+result.Z+",S: "+result.S);                
	                setInterval(refresh, interval);
	            }
	        });
	    };
	    refresh();
	});


// Javascript version 

function ajax(){	
	var xhttp;
	if (window.XMLHttpRequest) {
	    xhttp = new XMLHttpRequest();
	    } else {
	    // code for IE6, IE5
	    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET", "http://localhost:8080/robot/RobotResponse", true);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		  if (xhttp.readyState == 4 && xhttp.status == 200) {
		    document.getElementById("coord").innerHTML = xhttp.responseText;
		  }
		};			
}

function refresh(){	
	setInterval("ajax();",50);
}



