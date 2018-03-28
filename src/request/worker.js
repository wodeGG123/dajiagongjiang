import Request from './index.js'
import API from './api.js'
let Worker = new Object()

Worker.list = function(param){

    return Request.get(API.WORKER_LIST,param)
    .then((data)=>{      
        if(data.state){
            return data;
        }else{
            return false;
        } 
        
    })

}
export default Worker