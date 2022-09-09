import domain from "./domain";

export default {
    getAllCustomers(parms){
        return domain().get('/auth/byRole?role=customer')
    },

    getAllDrivers(parms){
        return domain().get('/auth/byRole?role=driver')
    },
    
    getAllVehicles(parms){
        return domain().get('/vehicle/findAll')
    },
    
    getAllJourneis(parms){
        return domain().get('/journey/findAll')
    },

    createDriver(driver){
        return domain().post('/auth/driver/create',driver)
    },

    createVehicle(vehicle){
        return domain().post('vehicle/create',vehicle)
    },

    deleteDriver(id){
        return domain().delete('/auth/delete?id='+id)
    },

    deleteVehicle(id){
        return domain().delete('/vehicle/delete?id'+ id)
    }



    
}