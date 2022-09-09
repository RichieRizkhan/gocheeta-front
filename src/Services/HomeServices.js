import domain from "./domain";

export default {
    getAllHomes(parms){
        return domain().get('/homes/'+parms)
    },

    addRequest(obj){
        return domain().post('/request/addRequest',obj)
    },
    
    findRequest(date,id){
        
        return domain().get(`/request?date=${date}&id=${id}`)
    }
}