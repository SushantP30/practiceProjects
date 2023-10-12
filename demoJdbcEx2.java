package jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class demoJdbcEx2 {

	public static void main(String[] args) throws SQLException ,ClassNotFoundException{
		// TODO Auto-generated method stub
           try {
        	   Class.forName("com.mysql.cj.jdbc.Driver");
        	   System.out.println("Driver loaded!!");
        	   Connection con =DriverManager.getConnection("jdbc:mysql://localhost:3306/hospital","root","root");
        	   Statement st =con.createStatement();
        	   System.out.println("Statement Created!!");
        	  // int i=st.executeUpdate("create table Fruits (fid int not null,fname varchar(100),amount int ,primary key(fid))");
        	   int i = st.executeUpdate("INSERT INTO Fruits VALUES (1, 'Apple', 100),(2,'Banana',200)");
           }catch(ClassNotFoundException e) {
        	   System.out.println(e);
           }catch(SQLException e1) {
        	   System.out.println(e1);
           }
	}
 
}
