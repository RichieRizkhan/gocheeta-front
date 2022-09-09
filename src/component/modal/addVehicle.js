/**  
 * @author Mevan Nirosh
 * @version 1.0
 * @since 2022-03-23
 */

 import { Select ,Option} from "@mobiscroll/react";
import React, { useEffect, useState } from "react";
 import { Button, Modal, Row, Col, Form, Toast } from 'react-bootstrap';
import AdminService from "../../Services/AdminService";
import UserServices from "../../Services/UserServices";
 
 
 
 const AddVehicle = (props) => {
     const [data, setData] = useState([])
     const [drivers, setDrivers] = useState([])
     const [iserror, setIserror] = useState(false);
     const [iserrorShow, setIserrorShow] = useState(false);
     const [errorMessages, setErrorMessages] = useState([]);
     const [isSuccess, setIsSuccess] = useState(false);
     const [successMessages, setSuccessMessages] = useState([]);
     const [newTerminals, setNewTerminals] = useState([]);
     const [isadded, setIsAdded] = useState(false)

     useEffect(()=>{

        AdminService.getAllDrivers().then(res=>{
                    setDrivers(res.data)
        }).catch(e=>{

        })

     },[  ])
 
     const handleChange = (e) => {
         const value = e.target.value;
         setIserror(false)
         setData({
             ...data,
             [e.target.name]: value
         });
     }

 
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
         data.role ="driver"

         AdminService.createVehicle(data).then(res=>{
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
             }}
         >
             <Modal.Header closeButton>
                 <Modal.Title id="contained-modal-title-vcenter">
                     Add new Vehicle
                 </Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 
                 <Form onSubmit={handleSubmit}>
                        
                         <Form.Group as={Col} controlId="formGridTerminalSerial" className="mb-3">
                             <Form.Select name="type" onChange={handleChange} required>
                             <option value="" defaultChecked hidden>Select Vehicle Type</option>
                                <option value="car">car</option>
                                <option value="Van">Van</option>
                                <option value="tuk">Tuk Tuk</option>
                             </Form.Select>
                         </Form.Group>
                         <Form.Group as={Col} controlId="formGridTerminalSerial" className="mb-3">
                             <Form.Control  name="numberPlate" type="text" placeholder="number Plate" onChange={handleChange} required />
                         </Form.Group>
                         <Form.Group as={Col} controlId="formGridTerminalSerial" className="mb-3">
                             <Form.Select name="driver" onChange={handleChange} required>
                                <option value="car" defaultChecked disabled>Select the Driver</option>
                                {
                                    drivers.map(driver=>{
                                        return <option value={driver.userID}>{driver.username}</option>
                                    })
                                }
                             </Form.Select>
                         </Form.Group>
                         
                     <Modal.Footer>
                         <Button variant="primary" type="submit" >
                             Save
                         </Button>
                     </Modal.Footer>
                 </Form>
             </Modal.Body>
         </Modal>
     );
 }
 
 export default AddVehicle;
 
 
 