import React from 'react';
import 'react-calendar/dist/Calendar.css';
import {Button,Offcanvas,Card,Table,Dropdown,Form,Modal,Badge,Row,Col} from 'react-bootstrap';
import UserService from '../../Services/UserServices'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import AdminService from '../../Services/AdminService';
import DriverService from '../../Services/DriverService';

function DriverDashboard() {
  const [show, setShow] = React.useState(false);
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
  const [pendingJourney, setpendingJourney] = React.useState([]);
  let history = useHistory();

  //user list assign
  const [Users,SetUsers] = React.useState([]);


  // useeffect from gather data from api call
  React.useEffect(async()=> {


  DriverService.finishJournies().then((res)=>{
    setJourney(res.data)
    console.log(res.data)
}).catch((err)=>console.log(err))

DriverService.pendingJournies().then((res)=>{
    setpendingJourney(res.data)
    console.log(res.data)
}).catch((err)=>console.log(err))


       
  },[showDelete])
  //edit user
  const EditHandler = async()=>{
      const res = await UserService.updateUser(id,{"userName":username,"phone":Phone,"Approved":approval});

      alert(res.data)
  }

  //delete user
  const handleDeleteUser =async()=>{
      const res = await DriverService.finish(id).then(res=>{
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

<div>
                  <Button variant="danger" style={{float:"right",width:"10%",marginTop:"60px"}} onClick={()=>{
                       localStorage.clear();
                       sessionStorage.clear();
                       history.push('/')

                  }}>Log Out</Button>
              </div>
        
        <div className="Stat" style={{display:"flex"}}>
          

              </div>

<Row>
    <Col>
    
    <div  className='Stat' style={{ display:"flex", backgroundColor:"#8cc8d3",marginLeft:"30px",marginRight:"30px",marginTop:"100px", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",borderRadius:"7px",height:"50px"}}>
                <h6 style={{color:'white',padding:"15px"}}>Pending Journies </h6>
               
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
                      {pendingJourney.map(user =>
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
                                     setShow(true)
                                     setId(user._id)
                                     setUsername(user.userName)
                                     setPhone(user.phone)
                                     setApproval(user.Approved)
                                     
                                  }}>Edit</Dropdown.Item>
                                  <Dropdown.Item href="#/action-2" onClick={()=>{
                                     handleDelete(true)
                                     setId(user.id)
                                  }}>Finish</Dropdown.Item>

                             
                                </Dropdown.Menu>
                            </Dropdown>


                          </td>
                        </tr> )}
                        
                       
                      </tbody>
                  </Table>
              </div>
  


              {/* Edit modal view */}
              <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Edit User</Offcanvas.Title>
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
                  <Modal.Title>Delete User</Modal.Title>
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
    </Col>
    <Col>
    
    <div  className='Stat' style={{ display:"flex", backgroundColor:"#8cc8d3",marginLeft:"30px",marginRight:"30px",marginTop:"100px", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",borderRadius:"7px",height:"50px"}}>
                <h6 style={{color:'white',padding:"15px"}}>past Journies </h6>
               
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
                          
                        
                        </tr> )}
                        
                       
                      </tbody>
                  </Table>
              </div>
            


              {/* Edit modal view */}
              <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Edit User</Offcanvas.Title>
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
                  <Modal.Title>Finish User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You Sure </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="danger" onClick={handleDeleteUser}>
                   Finish
                  </Button>
                </Modal.Footer>
              </Modal>
    </Col>
</Row>
    </div>  
  );


}
export default DriverDashboard