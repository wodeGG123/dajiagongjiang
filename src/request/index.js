import 'whatwg-fetch'

let Request = new Object();

Request.get = function(url,param){

    let paramsArray = [];
    //拼接参数
    Object.keys(param).forEach(key => paramsArray.push(key + '=' + param[key]))
    if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
    } else {
        url += '&' + paramsArray.join('&')
    }

    return fetch(url,{
        method:'GET',
        mode:'no-cors',
    })

}

Request.post = function(url,param){

    return fetch(url,{
        method:'POST',
        mode:'no-cors',
        headers: {},
        body:JSON.stringify(param)
    })

}

export default Request