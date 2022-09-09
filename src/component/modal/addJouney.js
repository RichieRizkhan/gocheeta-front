/**  
 * @author Mevan Nirosh
 * @version 1.0
 * @since 2022-03-23
 */

 import React, { useEffect, useState } from "react";
 import { Button, Modal, Row, Col, Form, Toast } from 'react-bootstrap';
import AdminService from "../../Services/AdminService";
import UserServices from "../../Services/UserServices";
 
 
 
 const AddJourney = (props) => {
     const [data, setData] = useState([])
     const [iserror, setIserror] = useState(false);
     const [iserrorShow, setIserrorShow] = useState(false);
     const [errorMessages, setErrorMessages] = useState([]);
     const [isSuccess, setIsSuccess] = useState(false);
     const [successMessages, setSuccessMessages] = useState([]);
     const [newTerminals, setNewTerminals] = useState([]);
     const [isadded, setIsAdded] = useState(false)

     const [type, setType] = useState("")
     const [vehicles, setVehicles] = useState([])

     const [price, setPrice] = useState(0)
 
     const handleChange = (e) => {
         const value = e.target.value;
         setIserror(false)
         setData({
             ...data,
             [e.target.name]: value
         });
     }

     useEffect(()=>{

        let temp   = {status:"free", type: type}
        UserServices.getFreeVehicle(temp).then(res=>{
                setVehicles(res.data)
        }).catch(e=>{

        })

        if(type=="car"){
            setPrice(100*data.distance)
        }
        if(type=="van"){
            setPrice(200*data.distance)
        }
        if(type=="tuk"){
            setPrice(70*data.distance)
        }

        
     },[type])
 
     const handleTerminalAdd = (e) => {
         e.preventDefault();
         const terminalSerialNo = data.terminalSerial
         const arr = [...newTerminals]
         const obj = { terminalSerialNo: terminalSerialNo }
         arr.push(obj)
         setIsAdded(true);
         setNewTerminals(arr);
     }
 
     const removeTerminal = (i) => {
         newTerminals.splice(i, 1)
         const arr = [...newTerminals]
         setIsAdded(true);
         setNewTerminals(arr);
     }
 
     const handleSubmit = (e) => {
         e.preventDefault();
         data.user = localStorage.getItem("userId")
         data.price = price

         UserServices.createJOurney(data).then(res=>{
            alert("scussesfully added")
            setData([])
         }).catch(e=>{
            alert("failed")
         })
        //  MerchApi
        //      .post("/terminal/registrations", copyData)
        //      .then((res) => {
        //          if (res.status === 201) {
        //              setSuccessMessages(["Merchant and terminals created successfully"])
        //              setIsSuccess(true)
        //              setTimeout(props.onHide,2000)
        //          }
        //      })
        //      .catch((error) => {
        //          if (error.response) {
        //              if (error.response.status === 404) {
        //                  setErrorMessages(["Merchant creation failed: Not found"]);
        //                  setIserror(true);
        //                  setIserrorShow(true)
 
        //              }
        //              else if (error.response.status === 400) {
        //                  setErrorMessages(["Merchant creation failed: " + error.response?.data.description]);
        //                  setIserror(true);
        //                  setIserrorShow(true)
        //              }
        //              else if (error.response.status === 403) {
        //                  setErrorMessages(["Merchant creation failed: Fobidden"]);
        //                  setIserror(true);
        //                  setIserrorShow(true)
        //              }
        //              else if (error.response.status === 405) {
        //                  setErrorMessages(["Merchant creation failed: Method not allowed"]);
        //                  setIserror(true);
        //                  setIserrorShow(true)
        //              }
        //              else if (error.response.status === 401) {
        //                  setErrorMessages([]);
        //                  setIserror(true);
        //                  setIserrorShow(false)
        //              }
        //              else {
        //                  setErrorMessages(["Merchant creation failed: " + error.response.status]);
        //                  setIserror(true);
        //                  setIserrorShow(true)
        //              }
        //          } else if (error.request) {
        //              console.log('Request Error', error.request);
 
        //          } else {
        //              console.log('Error message', error.message);
        //          }
        //      });
     }
 
     return (
         <Modal
             {...props}
             size="lg"
             aria-labelledby="contained-modal-title-vcenter"
             centered
             backdrop="static"
             keyboard={false}
             onExited={() => {
                 setIserror(false)
                 setErrorMessages([])
                 setIsSuccess(false)
                 setSuccessMessages([])
                 setData([])
                 setNewTerminals([])
                 setPrice(0)
             }}
         >
             <Modal.Header closeButton>
                 <Modal.Title id="contained-modal-title-vcenter">
                     Add new Journey
                 </Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 
                 <Form onSubmit={handleSubmit}>
                         <Form.Group as={Col} controlId="formGridTerminalSerial" className="mb-3">
                             <Form.Control  name="pickup" type="text" placeholder="pickup" onChange={handleChange} required />
                         </Form.Group>
                         <Form.Group as={Col} controlId="formGridTerminalSerial" className="mb-3">
                             <Form.Control  name="destination" type="text" placeholder="destination" onChange={handleChange} required />
                         </Form.Group>
                         <Form.Group as={Col} controlId="formGridTerminalSerial" className="mb-3">
                             <Form.Control  name="distance" type="number" placeholder="distance (km)" onChange={handleChange} required />
                         </Form.Group>
                         <Form.Group as={Col} controlId="formGridTerminalSerial" className="mb-3">
                             <Form.Select  name="type" type="email" placeholder="type" onChange={(e)=>{
                                setType(e.target.value)
                             }} required >
                                <option value="car">car</option>
                                <option value="van">van</option>
                                <option value="tuk">tuk</option>
                             </Form.Select>
                         </Form.Group>
                         <Form.Group as={Col} controlId="formGridTerminalSerial" className="mb-3">
                             <Form.Select  name="vehicle" type="email" placeholder="type" onChange={handleChange} required >
                                <option value="car" disabled>select the driver</option>
                                {
                                    vehicles.map(veh=>{
                                        return <option value={veh.id}>{veh.numberPlate}</option>
                                    })
                                }
                             </Form.Select>
                         </Form.Group>

                         
                         
                     <Modal.Footer>
                        <h1>{'Price :'+price}</h1>
                         <Button variant="primary" type="submit" >
                             Save
                         </Button>
                     </Modal.Footer>
                 </Form>
             </Modal.Body>
         </Modal>
     );
 }
 
 export default AddJourney;
 
 
 