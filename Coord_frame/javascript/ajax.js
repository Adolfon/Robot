//WebSocket version ====================================

// Include a reference to closeSocket() and openSocket() functions 
//inside of the script related to submenu click processing (settingMenu.js). 
function openSocket(coord_system){    	
        // Ensures only one connection is open at a time       	
        if(webSocket !== undefined && webSocket.readyState !== WebSocket.CLOSED)           
            return;
        
        // Create a new instance of the websocket
        webSocket = new WebSocket("ws://localhost/coordWS");
                       
        //when I have a message from the server...       
        webSocket.onmessage = function(msg){
        	
	            webSocket.send(coord_system);        		
        		var resp= JSON.parse(msg);
	            writeResponse(resp,coord_system);	            
        };                       
    }
 
    function closeSocket(){
        webSocket.close();
    }

    function writeResponse(text,coord){
        if (coord='XY'){
        	$("#ax1_value").text(text.AX1);
            $("#ax2_value").text(text.AX2);
            $("#ax3_value").text(text.AX3);
            $("#ax4_value").text(text.AX4);
            $("#ax5_value").text(text.AX5);
            $("#ax6_value").text(text.AX6);
        }
    }

//Jquery version ====================================

$(document).ready(function () {		
	    var interval = 50;   // ms per call   
	    var refresh = function() {
	        $.ajax({	            
	        	url: "http://192.168.240.69/cgi-bin/get_current_position.py",
	            cache: false,	            
	            crossDomain:false,	            
	            success: function(result) {	            		            		                                
	            	$("#coord").html("AX1: "+result.AX1+",AX2: "+result.AX2+",AX3: "+result.AX3+",AX4: "
	            			+result.AX4+",AX5: "+result.AX5+",AX6: "+result.AX6+",system: "+result.system);
	                setInterval(refresh, interval);
	            }
	        });
	    };
	    refresh();
	});


// Javascript version  =================================

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
	setInterval("ajax();",550);
}



