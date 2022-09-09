import React, { useState } from 'react';
import '../../index.css'
import 'react-calendar/dist/Calendar.css';
import { Button,Form,Modal,ToastContainer,Toast} from 'react-bootstrap';
import UserService from '../../Services/UserServices'
import { useHistory } from "react-router-dom";
import AddCustomer from '../modal/addCustomer';


function VisterDashBoard() {
 
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [showToast , setShowToast] = useState(false)
  const [msg,setmsg] = useState("")
  const [color,setcolor] = useState("")
  

  let history = useHistory();

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [homeName, sethomeName] = useState("");
  const [NoOfPerson, setNoOfPerson] = useState("");
  const [category, setcategory] = useState("");
  const [Account_No, setAccount_No] = useState("");
  const [bankName, setbankName] = useState("");

    //logged user validation
    React.useEffect(() => {
      if(localStorage.getItem("token")){
        
        history.push('/home')
      }
      else{
        history.push('/')
      }

  }, [])


  const Registerhandler = async(e)=>{
      e.preventDefault()
      if(userName.trim() === "" || password.trim() === "" || phone.trim() === "" || Address.trim() === "" || homeName.trim() === "" ||  category.trim() === "" || NoOfPerson.trim() === "" || Account_No.trim() === "" || bankName.trim() === ""){
            setmsg("All Fields Requird")
            setcolor("danger")
            setShowToast(true)
      }
      else{
            const res = await UserService.CreateUser(
                  {
                        "userName":userName,
                        "password":password,
                        "phone":phone,
                        "Address":Address,
                        "homeName":homeName,
                        "Catagory":category,
                        "noOfPersons":NoOfPerson,
                        "accNo":Account_No,
                        "bankName":bankName
                  }
                  

            ); 
            if(res){
                  if(res.data.success){
                        setmsg(res.data.msg)
                        setcolor("success")
                        setShowToast(true)
            
                  }
                  else{
                        setmsg(res.data.msg)
                        setcolor("danger")
                        setShowToast(true)
            
                  }

            }
            else{
                  setmsg(res.data.msg)
                  setcolor("danger")
                  setShowToast(true)

            }
      }
      

  }
  const loginHandler = async(e)=>{
           e.preventDefault();
           const res = await  UserService.loginUser({"username":userName,"password":password})

           console.log(res, res.status)

           if(res.status == 202){
                  //success toast display
                  //store token in local storage
                  localStorage.setItem("userName",res.data.username)
                  localStorage.setItem("role",res.data.role)
                  localStorage.setItem("userId",res.data.userID)

                  history.push("/home");
      
           }
           else{
                 //alert
                 setmsg(res.data.msg)
                 setcolor("danger")
                 setShowToast(true)

           }
  }
  

  


//================================   Login Form Segment =================================================
  return (
    <div className="view" style={{paddingTop:"100px"}}>
         <div >
            <h1 style={{color:'white',marginLeft:'20%'}}>Go Cheeta</h1>
            <div className="form-box" style={{backgroundColor:"white",height:'400px',width:'500px',marginLeft:'60%',marginTop:'-40px'}}>
                  <div className="form-content" style={{paddingLeft:'30px',paddingRight:'30px',paddingTop:'30px'}}>
                  <h5>LOGIN</h5>
                  
                  <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter UserName" value={userName} onChange={(e)=>{
                                    setUsername(e.target.value)
                            }} required/>
                            <Form.Text className="text-muted">
                              We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" onChange={(e)=>{
                                setPassword(e.target.value)
                          }} />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                      </Form.Group>
                      <Button onClick={loginHandler} style={{width:'100%',boxShadow:"0 12px 12px 0 rgba(0, 0, 0, 0.2), 0 6px 50px 0 rgba(0, 0, 0, 0.19)"}} variant="primary" type="submit">
                          LOGIN
                      </Button>
                        <div className="" style={{paddingTop:'12px',fontSize:'20px'}}>
                        <Button onClick={(e)=>{
                           setFullscreen(true)
                           setShow(true)
                           e.preventDefault()
                           
                          
                        }} style={{width:'50%',boxShadow:"0 12px 12px 0 rgba(0, 0, 0, 0.2), 0 6px 50px 0 rgba(0, 0, 0, 0.19)"}} variant="danger" type="submit">
                         Create User Account
                      </Button>
                      
                      </div>
                      </Form>   
                  </div>
            </div>
         <div>
    </div>
 </div>  
    {/*  ============================================================= Login end =========================================== */}
 {/* Register modal */}
 

      <AddCustomer
      show={show} fullscreen="lg-down" onHide={() => setShow(false)}
      />


    {/* toast componets */}
<ToastContainer className="p-3" position="bottom-end">
<Toast show={showToast} bg={color}>
  <Toast.Header closeButton={true} onClick={()=>{
          setShowToast(false)
  }} >
    <img
      src="holder.js/20x20?text=%20"
      className="rounded me-2"
      alt=""
    />
    <strong className="me-auto"></strong>
    <small>1 mins ago</small>
  </Toast.Header>
  <Toast.Body>{msg}</Toast.Body>
</Toast>
</ToastContainer>
</div>

  );








 }
 



export default VisterDashBoard