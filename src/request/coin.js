import Request from './index.js'
import API from './api.js'
let Coin = new Object()

Coin.recharge = function(param){

    return Request.post(API.COIN_RECHARGE,param)
    .then((data)=>{      
        if(data.state){
            return data;
        }else{
            return false;
        } 
        
    })

}
Coin.getCash = function(param){

    return Request.post(API.COIN_GETCASH,param)
    .then((data)=>{      
        if(data.state){
            return data;
        }else{
            return false;
        } 
        
    })

}
Coin.give = function(param){

    return Request.post(API.COIN_GIVE,param)
    .then((data)=>{      
        if(data.state){
            return data;
        }else{
            return false;
        } 
        
    })

}
Coin.list = function(param){

    return Request.get(API.COIN_LIST,param)
    .then((data)=>{      
        if(data.state){
            return data;
        }else{
            return false;
        } 
        
    })

}
export default Coin