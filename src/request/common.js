import Request from './index.js'
import API from './api.js'
let Common = new Object()

Common.upload = function(file){

    return Request.post(API.FILE_UPLOAD,{
        file
    })
    .then((data)=>{      
        if(data.state){
            return data;
        }else{
            return false;
        } 
        
    })

}


Common.noticeList = function(){
    return Request.get(API.NOTICE_LIST)
    .then((data)=>{      
        if(data.state){
            return data;
        }else{
            return false;
        } 
        
    })
}
Common.bannerList = function(){
    return Request.get(API.BANNER_LIST)
    .then((data)=>{      
        if(data.state){
            return data;
        }else{
            return false;
        } 
        
    })
}
Common.myMessage = function(params){
    return Request.get(API.MESSAGE_LIST,params)
    .then((data)=>{      
        if(data.state){
            return data;
        }else{
            return false;
        } 
        
    })
}
Common.jobList = function(){
    return Request.get(API.JOB_LIST)
    .then((data)=>{      
        if(data.state){
            return data;
        }else{
            return false;
        } 
        
    })
}
export default Common