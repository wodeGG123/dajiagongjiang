import Request from './index.js'
import API from './api.js'
let Article = new Object()

Article.list = function(params){

    return Request.get('user/article/list',params||{})
    .then((data)=>{      
        if(data.state){
            return data;
        }else{
            return false;
        } 
        
    })

}
export default Article