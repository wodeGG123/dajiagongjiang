import Request from './index.js'
import API from './api.js'
let Order = new Object()

Order.list = function(param){


    return Request.get('user/'+ param.uid +'/order',param)
    .then((data)=>{      
        if(data.state){
            return data;
        }else{
            return false;
        } 
        
    })

}
Order.make = function(param){
    return Request.post(API.MAKE_ORDER,param)
    .then((data)=>{
        if(data.state){
            return data;
        }else{
            return false;
        } 
    })
}
Order.set = function(id,param){
    param._method = 'PUT';
    return Request.post(API.SET_ORDER+id,param)
    .then((data)=>{
        if(data.state){
            return data;
        }else{
            return false;
        } 
    })
}
Order.estimate = function(id,param){
    return Request.post('user/' + id + '/comment',param)
    .then((data)=>{
        if(data.state){
            return data;
        }else{
            return false;
        } 
    })
}
export default Order