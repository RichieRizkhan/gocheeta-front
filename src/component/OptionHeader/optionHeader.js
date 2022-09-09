import React from 'react';
import { useHistory } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import {Container,Navbar,Nav,Offcanvas ,Button} from 'react-bootstrap';


function OptionHeader() {

    const history = useHistory()
    //const [user, setUser] = useState(localStorage.getItem("role"))
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   

  return ( 
    <div>
            <Navbar fixed="top" style={{backgroundColor:"white",boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}  >
                <Container>
                <Navbar.Brand style={{color:"black"}} href="#home">Go Cheeta</Navbar.Brand>

                <Button variant="danger" style={{marginLeft:"30%",width:"30%",marginTop:"30px"}} onClick={()=>{
                       localStorage.clear();
                       sessionStorage.clear();
                       history.push('/')

                  }}>Log Out</Button>
            
            {/* <Nav style={{marginLeft:"100px",color:'black'}} className="me-auto">
                    <Nav.Link href="/Children">Children</Nav.Link>
                    <Nav.Link href="/Elder">Elder</Nav.Link>
                    <Nav.Link href="/Nursing">Nursing Home</Nav.Link> 
            </Nav> */}
           
                </Container>
            </Navbar>

    

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add User</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            
        </Offcanvas.Body>
      </Offcanvas>      

    </div>  
  );


}
export default OptionHeader