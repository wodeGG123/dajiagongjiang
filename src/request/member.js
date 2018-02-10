import Request from './index.js'
import API from './api.js'
let Member = new Object()

Member.login = function(mobile,password){

    return Request.post(API.DOMAIN+API.LOGIN,{
        mobile,
        password
    })
    .then((data)=>{return data})

}
Member.mobileVerify = function(mobile,type){

    return Request.get(API.DOMAIN+API.LOGIN,{
        mobile,
        type
    })
    .then((data)=>{return data})

}
export default Member