import domain from "./domain";



export default {
//create user
 CreateUser(obj){    
    return  domain().post('/signup',obj);
},

//login User
loginUser(obj){
    return domain().post('/auth/login',obj)

},
//get all users
 getallUsers(){
    return domain().get('/');
},

//update User
 updateUser(id,obj){
    return domain().put('/updateUser/'+id,obj);
},

//update approval
 updateApproval(id){
    return domain().put('/'+id);
},

//delete account
 deleteAccount(id){
    return domain().delete('/'+id)
},

myJournies(){
    let id = localStorage.getItem("userId")
    return domain().get('/journey/findByUser?id='+id)
}
,
getFreeVehicle(data){
    return domain().post('/vehicle/findAllByTypeAndStatus',data)
},

createJOurney(data){
    return domain().post('/journey/create',data)
},

cancel(id){
    return domain().post('/journey/cancel?id='+id)
}

}
