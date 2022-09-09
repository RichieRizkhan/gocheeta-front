import axios from 'axios';
import React, { useState } from 'react';
import {Row,Col,Button,Form} from 'react-bootstrap';
import { useHistory } from "react-router-dom";


function Calender() {
  const [home_id, setHomeId] = useState("");
  const [Address, setAddress] = useState("");
  const [homeName, sethomeName] = useState("");
  const [NoOfPerson, setNoOfPerson] = useState("");
  const [Account_No, setAccount_No] = useState("");
  const [bankName, setbankName] = useState("");
  let history = useHistory();


  React.useEffect(async() => {
     //get home information by :id
     const res = await axios.get('http://localhost:5000/homes/getHomeInformation/'+localStorage.getItem("id"));
     if(res){
        console.log(res.data)
        setHomeId(res.data._id)
        sethomeName(res.data.homeName)
        setAddress(res.data.Address)
        setNoOfPerson(res.data.noOfPersons)
        setAccount_No(res.data.accNo)
        setbankName(res.data.bankName)


     }
     else{
      console.log("error")
     }

}, [])

const updateHandler =async()=>{
     const res = await axios.put('http://localhost:5000/homes/updateHome/'+home_id,{"homeName":homeName,"noOfPersons":NoOfPerson,"accNo":Account_No,"bankName":bankName,"Address":Address});
     console.log(res)
     if(res){
        //push to dashboard
        alert("Information Updated")
        history.push('/home')

     }
     else{
      console.log("error")
     }
}

      

  return (
   
    <div style={{paddingTop:"0px"}}>
       <div style={{backgroundColor:"#8cc8d3",marginLeft:"30px",marginRight:"30px",marginTop:"80px", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",borderRadius:"7px",height:"50px"}}>
                <h6 style={{color:'white',padding:"15px"}}> Edit Home Information</h6>
       </div>
        
      <div style={{backgroundColor:'',width:"50%",height:'70vh'}}>
          <div style={{paddingTop:"20%",paddingLeft:'20px',paddingRight:'20px'}}>
          <Form>
  <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
    <Form.Label column sm={2}>
      Home Name
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="text" value={homeName} onChange={(e)=>{
            sethomeName(e.target.value)
      }}/>
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
    <Form.Label column sm={2}>
      Account No
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="text" value={Account_No} onChange={(e)=>{
          setAccount_No(e.target.value)
      }}/>
    </Col>
  </Form.Group>
  <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
    <Form.Label column sm={2}>
      Bank Name
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="text" value={bankName} onChange={(e)=>{
            setbankName(e.target.value);
      }} />
    </Col>
  </Form.Group>
  <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
    <Form.Label column sm={2}>
      Address
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="text" value={Address} onChange={(e)=>{
          setAddress(e.target.value)
      }}/>
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
    <Form.Label column sm={2}>
    noOfPersons
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="number" value={NoOfPerson} onChange={(e)=>{
          setNoOfPerson(e.target.value);
      }}/>
    </Col>
  </Form.Group>
  </Form>
  <Form.Group as={Row} className="mb-3">
    <Col sm={{ span: 10, offset: 2 }}>
      <Button type="submit" onClick={updateHandler}>Save</Button>
    </Col>
  </Form.Group>
          </div>
      
      </div>  
    </div>
     
  );


}
export default Calender