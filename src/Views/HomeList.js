
import React, { useState } from 'react';
import {useLocation} from 'react-router-dom'
import { Dropdown ,Table} from 'react-bootstrap';
import HomeServices from '../Services/HomeServices';
import mainConstant from '../constant/mainConstant';


function HomeList() {
   
    const location = useLocation();
    const [homes, setHomes] = useState([]);

    React.useEffect( async() => {
          if(location.pathname.split('/').includes("Children")){
            const res = await HomeServices.getAllHomes(mainConstant.CHILDREND);
            setHomes(res.data)
            console.log(res.data)
               
          }
          else if(location.pathname.split('/').includes("Elder")){
            const res = await HomeServices.getAllHomes(mainConstant.Elder);
            setHomes(res.data)
            console.log(res.data)
          }
          else{
            const res = await HomeServices.getAllHomes(mainConstant.Nursy);
            setHomes(res.data)
            console.log(res.data)
             
          }
            
    }, [])



  return (
   
    
    <div className="" style={{paddingTop:"100px"}}>
        <div style={{backgroundColor:"#8cc8d3",marginLeft:"30px",marginRight:"30px",marginTop:"12px", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",borderRadius:"7px",height:"50px"}}>
            <h6 style={{color:'white',padding:"15px"}}>{location.pathname.split('/')} Home List</h6>
        </div>

        <div className="Usertable" style={{paddingLeft:"40px",paddingRight:"40px",marginTop:"30px"}}>
                {/* user table */}
                  <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                          <th>Home name</th>
                          <th>Location</th>
                          <th>Account Number</th>
                          <th>Bank</th>
                          <th>Number of {location.pathname.split('/')}s</th>
                          <th>
                          </th>

                        </tr>
                      </thead>
                      <tbody>
                        {homes.map(home =>
                            <tr>
                            <td>{home.homeName}</td>
                            <td>{home.Address}</td>
                            <td>{home.accNo} </td>
                            <td>{home.bankName}</td>
                            <td>{home.noOfPersons}</td>
                    
                            <td>
                              <Dropdown>
                                  <Dropdown.Toggle variant="info" id="dropdown-basic">
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                 {localStorage.getItem("role") != "user" && localStorage.getItem("role") != "Admin" && <Dropdown.Item href={`/showCalender/`+home._id} onClick={()=>{
                                        sessionStorage.setItem("homeName",home.homeName)
                                    }}>Show Calender</Dropdown.Item>}
                                    
                                    
                                  </Dropdown.Menu>
                              </Dropdown>
  
  
                            </td>
                          </tr>

                        )}
                        
                        
                       
                      </tbody>
                  </Table>
              </div>


    </div>

    
       
    
     
  );




}
export default HomeList