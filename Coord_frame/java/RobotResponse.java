//package robot.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import org.json.simple.JSONObject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RobotResponse extends HttpServlet{

	private String message;
	
	private static Integer cx;
	private static Integer cy;
	private static Integer cz;
	private static Integer s;
	
public void init() throws ServletException{
	
	message="Hello Robot";
	this.cx=new Integer(1);
	this.cy=new Integer(2);
	this.cz=new Integer(3);
	this.s=new Integer(4);
}

/*
This is the CGI URL that They are using for this functions
http://192.168.0.100/cgi-bin/get_current_position.py?coord_system=xxx

Google JSON simple library:
	https://code.google.com/archive/p/json-simple/
	

 */


public void doGet(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException{
		
	response.setContentType("application/json");
	response.setCharacterEncoding("utf-8");        
	
	JSONObject respJson=buildJson();
	
    PrintWriter out = response.getWriter();
    
    out.print(respJson);
    out.flush();

}


public JSONObject buildJson(){

	this.cx++;
	this.cy++;
	this.cz++;
	this.s--;
	if (cx==Integer.MAX_VALUE-1||s==Integer.MIN_VALUE+1) 
		this.cx=this.cy=this.cz=this.s=0;
	JSONObject json = new JSONObject();
	json.put("X", this.cx);
	json.put("Y",this.cy);
	json.put("Z",this.cz);
	json.put("S",this.s);
	return json;
}

public void destroy()
{
    // do nothing.
}

}//End of the class
