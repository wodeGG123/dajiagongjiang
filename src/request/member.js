import Request from './index.js'
import API from './api.js'
let Member = new Object()

Member.login = function(mobile,password){

    return Request.post(API.LOGIN,{
        mobile,
        password
    })
    .then((data)=>{      
        if(data.state){
             //设置全局用户详情
             window.store.dispatch({
                type:'SET_USERINFO',
                data:data.data
            });
            //本地保存用户详情
            localStorage.setItem('userInfo',JSON.stringify(data.data));
            return data;
        }else{
            return false;
        } 
        
    })

}
Member.regist = function(mobile,password,verify){

    return Request.post(API.REGIST,{
        mobile,
        password,
        verify
    })
    .then((data)=>{return data})

}
Member.mobileVerify = function(mobile,type){

    return Request.get(API.MOBILE_VERIFY,{
        mobile,
        type
    })
    .then((data)=>{return data})

}
Member.passwordReset = function(uid,token,password){

    return Request.post(API.RESET_PASSWORD,{
        password,
        token,
        uid,
        _method:'PUT',
    })
    .then((data)=>{return data})

}
Member.passwordGetBack = function(mobile,password,verify){

    return Request.post(API.GETBACK_PASSWORD,{
        mobile,
        password,
        verify,
        // _method:'PUT',
    })
    .then((data)=>{return data})

}
Member.info = function(id,token){
    return Request.get(API.USER_INFO+id,{
        uid:id,
        token,
    })
    .then((data)=>{
        if(data.state){
            //设置全局用户详情
            window.store.dispatch({
                type:'SET_USERINFO_DETAIL',
                data:data.data.meta
            });
            //本地保存用户详情
            localStorage.setItem('userInfoDetail',JSON.stringify(data.data.meta));
            return data;
        }else{
            return false
        }
        
    })

}
Member.realAuth = function(params){
    return Request.post(API.USER_REAL,params)
    .then((data)=>{return data})
}
Member.realWorker = function(params){
    return Request.post(API.WORKER_REAL,params)
    .then((data)=>{return data})
}
Member.setThum = function(params){
    return Request.post(API.SET_USER_THUM,params)
    .then((data)=>{return data})
}
Member.setNickName = function(params){
    return Request.post(API.SET_USER_NICKNAME,params)
    .then((data)=>{return data})
}
export default Member