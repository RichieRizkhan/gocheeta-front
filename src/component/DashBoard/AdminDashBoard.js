import React from 'react';
import 'react-calendar/dist/Calendar.css';
import {Button,Offcanvas,Card,Table,Dropdown,Form,Modal,Badge,Row,Col} from 'react-bootstrap';
import UserService from '../../Services/UserServices'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import AdminService from '../../Services/AdminService';
import AddDriver from '../modal/addDriver';
import EditDriver from '../modal/editDriver';
import AddVehicle from '../modal/addVehicle';
import EditVehicle from '../modal/editVehicle';

function AdminDashBoard() {
  const [show, setShow] = React.useState(false);
  const [editShow, setEditShow] = React.useState(false);

  const [vehicleshow, setvehicleShow] = React.useState(false);
  const [editvehicleShow, setvehicleEditShow] = React.useState(false);
  const [deleteVehicleShow, setvehicleDeleteShow] = React.useState(false);


  const [showDelete, setshowDelete] = React.useState(false);
  const [id, setId] = React.useState(0);
  const [username, setUsername] = React.useState("");
  const [Phone, setPhone] = React.useState("");
  const [approval, setApproval] = React.useState(0);
  const [reqCount , setRequestCount] = React.useState(0);

  const [drivers, setDrivers] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const [vehicle, setVehicle] = React.useState([]);
  const [journey, setJourney] = React.useState([]);

  const [selectedUser, setSelectedUser] = React.useState({})
  const [selectedVehicle, setSelectedVehicle] = React.useState({})
  let history = useHistory();

  //user list assign
  const [Users,SetUsers] = React.useState([]);


  // useeffect from gather data from api call
  React.useEffect(async()=> {
      AdminService.getAllCustomers().then((res)=>{
          setCustomers(res.data)
          console.log(res.data)
      }).catch((err)=>console.log(err))

      AdminService.getAllDrivers().then((res)=>{
        setDrivers(res.data)
        console.log(res.data)
    }).catch((err)=>console.log(err))

    AdminService.getAllVehicles().then((res)=>{
      setVehicle(res.data)
      console.log(res.data)
  }).catch((err)=>console.log(err))

  AdminService.getAllJourneis().then((res)=>{
    setJourney(res.data)
    console.log(res.data)
}).catch((err)=>console.log(err))


       
  },[show,editShow,vehicleshow,editvehicleShow])
  //edit user
  const EditHandler = async()=>{
      const res = await UserService.updateUser(id,{"userName":username,"phone":Phone,"Approved":approval});

      alert(res.data)
  }

  //delete user
  const handleDeleteUser =async()=>{
      const res = await AdminService.deleteDriver(id);
      
      
  }
   //delete vehicle
   const handleDeleteVehicle =async()=>{
    const res = await AdminService.deleteVehicle(id);
    
    
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
    setvehicleDeleteShow(false)
  
  };
  const handleDelete =() =>{
      setshowDelete(true)
  }

 


return ( 
    <div className="Container"  >

<div>
                  <Button variant="danger" style={{float:"right",width:"10%",marginTop:"60px"}} onClick={()=>{
                       localStorage.clear();
                       sessionStorage.clear();
                       history.push('/')

                  }}>Log Out</Button>
              </div>


        
        <div className="Stat" style={{display:"flex"}}>
            <Card  
                    bg="info"
                    key=""
                    text="light"
                    style={{ width: '18rem',marginTop:"100px",marginLeft:"30px" }}
                    className="mb-2"
            >
            <Card.Header>Total Customers</Card.Header>
                    <Card.Body>
                      <Card.Title><h2>{customers.length}</h2></Card.Title>
                      <Card.Text>
                     
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card 
                    bg="success"
                    key=""
                    text="light"
                    style={{ width: '18rem',marginTop:"100px",marginLeft:"50px" }}
                    className="mb-2"
                  >
            <Card.Header>Total Drivers</Card.Header>
                    <Card.Body>
                      <Card.Title><h2>{drivers.length}</h2></Card.Title>
                      <Card.Text>
                        
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card 
                    bg="success"
                    key=""
                    text="light"
                    style={{ width: '18rem',marginTop:"100px",marginLeft:"50px" }}
                    className="mb-2"
                  >
            <Card.Header>Total Vehicles</Card.Header>
                    <Card.Body>
                      <Card.Title><h2>{vehicle.length}</h2></Card.Title>
                      <Card.Text>
                        
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card 
                    bg="success"
                    key=""
                    text="light"
                    style={{ width: '18rem',marginTop:"100px",marginLeft:"50px" }}
                    className="mb-2"
                  >
              <Card.Header>Total Journies</Card.Header>
                    <Card.Body>
                      <Card.Title><h2>{journey.length}</h2></Card.Title>
                      <Card.Text>
                       
                      </Card.Text>
                    </Card.Body>
                  </Card>

              </div>

              <Row>
                <Col>
                <div style={{backgroundColor:"#8cc8d3",marginLeft:"30px",marginRight:"30px",marginTop:"12px", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",borderRadius:"7px",height:"50px"}}>
                <h6 style={{color:'white',padding:"15px"}}>Vehicles </h6>
               
              </div>

              
              <Button style={{float:"right", marginTop:"20px", marginRight:"50px" , marginBottom:"20px"}} onClick={()=>{setvehicleShow(true)}}>
                  Add Vehicle
                </Button>

              <div className="Usertable" style={{paddingLeft:"40px",paddingRight:"40px",marginTop:"30px"}}>
                {/* user table */}
                  <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                          <th>Number Plate</th>
                          <th>Type</th>
                          <th>Status</th>
                          <th>Driver Name</th>
                        </tr>
                      </thead>
                      <tbody>
                      {vehicle.map(user =>
                      <tr>
                          <td>{user.numberPlate}</td>
                          <td>{user.type}</td>
                          <td>{user.status}</td>
                          <td>{user.driver.fullName}</td>
                          <td>
                            {user.Approved === 1 && <Badge bg="primary">Approved</Badge> }
                            {user.Approved === 0 && <Badge bg="danger">Not</Badge> }
                          </td>
                          <td>
                            <Dropdown>
                                <Dropdown.Toggle variant="info" id="dropdown-basic">
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={()=>{
                                     setvehicleEditShow(true)
                                     setId(user.userID)
                                     setSelectedVehicle(user)
                                     setUsername(user.userName)
                                     setPhone(user.phone)
                                     setApproval(user.Approved)
                                     
                                  }}>Edit</Dropdown.Item>
                                  <Dropdown.Item href="#/action-2" onClick={()=>{
                                     setvehicleDeleteShow(true)
                                     setId(user.id)
                                  }}>Delete</Dropdown.Item>

                             
                                </Dropdown.Menu>
                            </Dropdown>


                          </td>
                        </tr> )}
                        
                       
                      </tbody>
                  </Table>
              </div>
                </Col>
                <Col>
                <div style={{backgroundColor:"#8cc8d3",marginLeft:"30px",marginRight:"30px",marginTop:"12px", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",borderRadius:"7px",height:"50px"}}>
                <h6 style={{color:'white',padding:"15px"}}>Journies </h6>
               
              </div>

              <Button style={{float:"right", marginTop:"20px", marginRight:"50px" , marginBottom:"20px"}} onClick={()=>{
                
                setShow(true)
              }}>
                  Add Driver
                </Button>

              <div className="Usertable" style={{paddingLeft:"40px",paddingRight:"40px",marginTop:"30px"}}>
                {/* user table */}
                  <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                          <th>User Name</th>
                          <th>Full Name</th>
                          <th>Email</th>
                          <th>Branch</th>
                        </tr>
                      </thead>
                      <tbody>
                      {drivers.map(user =>
                      <tr>
                          <td>{user.username}</td>
                          <td>{user.fullName}</td>
                          <td>{user.email}</td>
                          <td>{user.branch}</td>
                          <td>
                            {user.Approved === 1 && <Badge bg="primary">Approved</Badge> }
                            {user.Approved === 0 && <Badge bg="danger">Not</Badge> }
                          </td>
                          <td>
                            <Dropdown>
                                <Dropdown.Toggle variant="info" id="dropdown-basic">
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={()=>{
                                    setEditShow(true)
                                    setSelectedUser(user)
                                     setId(user._id)
                                     setUsername(user.userName)
                                     setPhone(user.phone)
                                     setApproval(user.Approved)
                                     
                                  }}>Edit</Dropdown.Item>
                                  <Dropdown.Item href="#/action-2" onClick={()=>{
                                     handleDelete(true)
                                     setId(user.userID)
                                  }}>Delete</Dropdown.Item>

                             
                                </Dropdown.Menu>
                            </Dropdown>


                          </td>
                        </tr> )}
                        
                       
                      </tbody>
                  </Table>
              </div>
                </Col>
              </Row>

              <div style={{backgroundColor:"#8cc8d3",marginLeft:"30px",marginRight:"30px",marginTop:"12px", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",borderRadius:"7px",height:"50px"}}>
                <h6 style={{color:'white',padding:"15px"}}>Journies </h6>
               
              </div>


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
                            <Dropdown>
                                <Dropdown.Toggle variant="info" id="dropdown-basic">
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={()=>{
                                     setId(user._id)
                                     setUsername(user.userName)
                                     setPhone(user.phone)
                                     setApproval(user.Approved)
                                     
                                  }}>Edit</Dropdown.Item>
                                  <Dropdown.Item href="#/action-2" onClick={()=>{
                                     handleDelete(true)
                                     setId(user._id)
                                  }}>Delete</Dropdown.Item>

                             
                                </Dropdown.Menu>
                            </Dropdown>


                          </td>
                        </tr> )}
                        
                       
                      </tbody>
                  </Table>
              </div>





            {/* delete modal */}
              <Modal show={showDelete} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Driver</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You Sure to Delete User</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="danger" onClick={handleDeleteUser}>
                   Delete
                  </Button>
                </Modal.Footer>
              </Modal>

                          {/* delete modal */}
                          <Modal show={deleteVehicleShow} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Vehicle</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You Sure to Delete vehicle</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="danger" onClick={handleDeleteUser}>
                   Delete
                  </Button>
                </Modal.Footer>
              </Modal>

              <AddDriver show={show}
              onHide={() => setShow(false)}
              />

              <EditDriver
              show={editShow}
              editData={selectedUser}
              onHide={()=>{
                setEditShow(false)
                setSelectedUser({})
              }}
              />

              <AddVehicle
               show={vehicleshow}
               onHide={() => setvehicleShow(false)}
              />

              <EditVehicle 
              show={editvehicleShow}
              onHide={() => setvehicleEditShow(false)}
              editData={selectedVehicle}
              />
    </div>  
  );


}
export default AdminDashBoard