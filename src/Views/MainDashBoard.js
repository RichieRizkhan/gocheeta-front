
import React, { useState } from 'react';

//import all dashboards
import AdminDashBoard  from '../component/DashBoard/AdminDashBoard';
import DriverDashboard from '../component/DashBoard/DriverDashboard';
import UserDashboard from '../component/DashBoard/UserDashBoaed'
import NotFound  from './NotFound';




function MainDashBoard() {

  const role = localStorage.getItem("role")
 
  const [user, curruntUser] = useState(role)
  

    if(user === "admin"){
        return <AdminDashBoard />
    }
    else if(user === "customer"){
        return <UserDashboard />
    }
    else if(user === "driver"){
      return <DriverDashboard/>
    }
    else{
        return <NotFound />
    }
    
  return (
    <div>
         
        
    </div>
    

       

     
  );


}
export default MainDashBoard