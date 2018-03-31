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
Worker.busy = function(param){
    param._method = 'PUT'
    return Request.post(API.WORKER_BUSY,param)
    .then((data)=>{      
        if(data.state){
            return data;
        }else{
            return false;
        } 
        
    })

}
Worker.collocation = function(param){
    param._method = 'PUT'
    return Request.post(API.WORKER_COLLOCATION,param)
    .then((data)=>{      
        if(data.state){
            return data;
        }else{
            return false;
        } 
        
    })

}
export default Worker