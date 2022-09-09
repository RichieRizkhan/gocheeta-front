import React from 'react';
import 'react-calendar/dist/Calendar.css';
import {Button,Offcanvas,Card,Table,Dropdown,Form,Modal,Badge,Row,Col} from 'react-bootstrap';
import UserService from '../../Services/UserServices'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import AdminService from '../../Services/AdminService';
import AddJourney from '../modal/addJouney';
import EditJourney from '../modal/editJourney';

function UserDashboard() {
  const [show, setShow] = React.useState(false);
  const [showDelete, setshowDelete] = React.useState(false);
  const [addshow, setAddShow] = React.useState(false);
  const [editshow, setEditShow] = React.useState(false);

  const [selected, setSelected] = React.useState(false);

  const [id, setId] = React.useState(0);
  const [username, setUsername] = React.useState("");
  const [Phone, setPhone] = React.useState("");
  const [approval, setApproval] = React.useState(0);
  const [reqCount , setRequestCount] = React.useState(0);

  const [drivers, setDrivers] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const [vehicle, setVehicle] = React.useState([]);
  const [journey, setJourney] = React.useState([]);

  const [data,setData] = React.useState({})

  let history = useHistory();

  //user list assign
  const [Users,SetUsers] = React.useState([]);


  // useeffect from gather data from api call
  React.useEffect(async()=> {


  UserService.myJournies().then((res)=>{
    setJourney(res.data)
    console.log(res.data)
}).catch((err)=>console.log(err))


       
  },[showDelete,addshow])
  //edit user
  const EditHandler = async()=>{
      const res = await UserService.updateUser(id,{"userName":username,"phone":Phone,"Approved":approval});

      alert(res.data)
  }

  //delete user
  const handleDeleteUser =async()=>{
      const res = await UserService.cancel(id).then(res=>{
        setshowDelete(false)
      }).catch(e=>{
        alert("failed")
      })
    
      
  }
  //change approval
  const handleApprove =async()=>{
    const res = await UserService.updateApproval(id);
    if(res.data){
      alert("changed")
    }
    else{
      alert("updated Error")
    }
    
}


  const handleClose = () => {
    setShow(false)
    setshowDelete(false)
  
  };
  const handleDelete =() =>{
      setshowDelete(true)
  }

 


return ( 
    <div className="Container"  >
        
        <div className="Stat" style={{display:"flex"}}>
          

              </div>


              <div  className='Stat' style={{ display:"flex", backgroundColor:"#8cc8d3",marginLeft:"30px",marginRight:"30px",marginTop:"100px", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",borderRadius:"7px",height:"50px"}}>
                <h6 style={{color:'white',padding:"15px"}}>My Journies </h6>
               
              </div>

              <Button style={{float:"right", marginTop:"20px", marginRight:"50px" , marginBottom:"20px"}} onClick={()=>{setAddShow(true)}}>
                    new Journey
                </Button>

              <div className="Usertable" style={{paddingLeft:"40px",paddingRight:"40px",marginTop:"30px"}}>
                {/* user table */}
                  <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                          <th>Pick Up</th>
                          <th>Destination</th>
                          <th>Distance</th>
                          <th>Price</th>
                          <th>Vehicle</th>
                          <th>Driver</th>
                          <th>Passenger</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                      {journey.map(user =>
                      <tr>
                          <td>{user.pickup}</td>
                          <td>{user.destination}</td>
                          <td>{user.distance}</td>
                          <td>{user.price}</td>
                          <td>{user.user.username}</td>
                          <td>{user.vehicle.numberPlate}</td>
                          <td>{user.vehicle.driver.username}</td>
                          <td>{user.status}</td>
                          
                          <td>
                            {user.Approved === 1 && <Badge bg="primary">Approved</Badge> }
                            {user.Approved === 0 && <Badge bg="danger">Not</Badge> }
                          </td>
                          <td>
                            <Dropdown hidden={user.status!="ongoing"}>
                                <Dropdown.Toggle variant="info" id="dropdown-basic">
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={()=>{
                                     setEditShow(true)
                                     setSelected(user)
                                     setId(user.id)
                                     setUsername(user.userName)
                                     setPhone(user.phone)
                                     setApproval(user.Approved)
                                     
                                  }}>Edit</Dropdown.Item>
                                  <Dropdown.Item href="#/action-2" onClick={()=>{
                                     handleDelete(true)
                                     setId(user.id)
                                  }}>Cancel</Dropdown.Item>

                             
                                </Dropdown.Menu>
                            </Dropdown>


                          </td>
                        </tr> )}
                        
                       
                      </tbody>
                  </Table>
              </div>
              <div>
                  <Button variant="danger" style={{marginLeft:"30%",width:"30%",marginTop:"30px"}} onClick={()=>{
                       localStorage.clear();
                       sessionStorage.clear();
                       history.push('/')

                  }}>Log Out</Button>
              </div>

              <AddJourney 
              show={addshow}
              onHide={()=>{
                setAddShow(false)
              }}
              />

              <EditJourney
              show={editshow}
              onHide={()=>{
                setEditShow(false)
              }}
              editData={selected}
              />




              {/* Edit modal view */}
              <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>new journey</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <h6> User Name</h6>
                          <Form.Control type="text"  value={username} onChange={(e)=>{
                                setUsername(e.target.value)
                          }} />
                          <h6>Phone</h6>
                          <Form.Control type="text" value={Phone} onChange={(e)=>{
                                setPhone(e.target.value)
                          }} />
                          <h6>Approval {approval}</h6>
                          <Form.Select onChange={(e)=>{
                            setApproval(e.target.value)
                          }}>
                            <option >select</option>
                            <option value={0}>Reject</option>
                            <option value={1}>Approved</option>
                          </Form.Select>

                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={EditHandler}>
                          Edit
                        </Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>


            {/* delete modal */}
              <Modal show={showDelete} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Cancel Journey</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You Sure </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="danger" onClick={handleDeleteUser}>
                   Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
    </div>  
  );


}
export default UserDashboard