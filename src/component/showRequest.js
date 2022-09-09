import axios from 'axios';
import React, {useState } from 'react'
import {Card,Modal,Button,Badge,Form} from 'react-bootstrap';
import {useLocation} from 'react-router-dom'
import HomeService from '../Services/HomeServices'


function HomeList(props) {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [userName, setUsername] = useState("");
  const [Address, setAddress] = useState("");
  const [phone, setphone] = useState("");
  const [requestId, setRequestId] = useState("");
  let [accept, setaccept] = useState("");
  
  

 

  const handleRequest= async ()=>{
       
       const request = {
           "userName":userName,
           "Address":Address,
           "phone":phone,
           "home_id":location.pathname.split('/showCalender/')[1],
           "date":props.dateV
           
       }
       //console.log(request)
       const res = await HomeService.addRequest(request);
       if(res.data){
        alert("Request Sent")
       }
       else{
        alert("Request Not Sent")
       }
     
  }
  const updateCalender = async()=>{
        
        if(accept === "Accepted"){
            accept = true
        }
        else{
          accept = false
        }   

       const updatedRequest = {
            _id:requestId,
            accept:accept
        }
        
      const res = await axios.put('http://localhost:5000/request/update',updatedRequest)
      console.log(res.data)
      if(res.data){
        alert("Calender Updated")
      }
      else{
        alert("Calender Not Updated")
      }


       
  }


  if(localStorage.getItem("role") === "customer"){
        return (
            <div>
              <h1>{props.dateV}</h1>
              <Card style={{ width: '30rem',height:'100vh'}}>
                
                <Card.Body>
                    <Card.Title>Requests for {props.dateV}</Card.Title>
                    <Card.Text>
                       Accept Following Requests
                    </Card.Text>
                    <Card>
                      {props.requests.map(request =>
                      <Card.Body>
                         Requested By {request.userName}
                        <Button style={{marginLeft:"40px"}} variant="outline-success" onClick={()=>{
                          handleShow()
                          setUsername(request.userName)
                          setAddress(request.Address)
                          setphone(request.phone)
                          setRequestId(request._id)
                          if(request.accept){
                            setaccept("Accepted")
                          }
                          else{
                            setaccept("Not")
                          }
                          
                          

                        }}>Show</Button>
                      </Card.Body> )}
                    </Card>
                </Card.Body>
              </Card>


              {/* calender update modal ======================================================================== */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Updated Calender and Approve Request</Modal.Title>
        </Modal.Header>
        <Form style={{paddingLeft:"12px",paddingRight:"12px"}}>
              <p>User Name : {requestId}</p>
              <p>Address : {Address}</p>
              <p>phone : {phone}</p>
              <p>Accept : {accept}</p>

              <p>Please Contact the {userName} for accept the request if its not you can updated calender and delete request</p>
              <Button variant="outline-success" onClick={()=>{
                 setaccept("Accepted")
              }}>Mark As Accepted</Button>
              <Button variant="outline-success">Remove</Button>

              
              
           
        </Form>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateCalender}>
            Updated Calender
            
          </Button>
        </Modal.Footer>
      </Modal>

            </div>
        )
    }
    else{
      return (
        <div>
          <h1>{props.dateV}</h1>
         
          <Card style={{ width: '30rem',height:'100vh'}}>
            
            <Card.Body>
                <Card.Title>Send Request</Card.Title>
                <Card.Text>
                 Add Request
                </Card.Text>
                <Card>
                      {props.requests.map(request =>
                      <Card.Body>
                         Requested By {request.userName}
                        {request.accept && <Badge style={{marginLeft:"40px"}} bg="success">Accepted</Badge>}
                        {request.accept === false && (<Badge style={{marginLeft:"40px"}} bg="danger">Not Accepted yet</Badge>)}
                      </Card.Body> )} 
                </Card>
                {props.requests.length < 3 && <Button style={{width:"100%",marginTop:"30px"}} variant="outline-primary" onClick={()=>{
                      handleShow(true)
                      
                }}>Add Request</Button>}
                {props.requests.length === 3 && 
                <p style={{color:"red",padding:'12px'}}>You Can Contact  House Owner for updated the Not Accepted Request or you can request another day</p>}
              
                 
            </Card.Body>
          </Card>
          {/* ============================================================== modal view =============================== */}

        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Send a Request</Modal.Title>
        </Modal.Header>
        <Form style={{paddingLeft:"12px",paddingRight:"12px"}}>
           
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" placeholder="Enter User Name" value={userName} onChange={(e)=>{
                      setUsername(e.target.value)
                }}/>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter Address" value={Address} onChange={(e)=>{
                      setAddress(e.target.value)
                }}/>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Enter Phone" value={phone} onChange={(e)=>{
                    setphone(e.target.value)
                }} />
            </Form.Group>
      </Form>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRequest}>
            Send Request
            
          </Button>
        </Modal.Footer>
      </Modal>

</div>
    )
        
    }
  }
  
  export default HomeList
