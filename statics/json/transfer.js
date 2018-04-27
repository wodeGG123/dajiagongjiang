var e = require('./areas.json')
var fs = require('fs');

var o = [];

function tr(data){
    if(data instanceof Array){
        // console.log(data);
        return data.map((obj,index)=>{
            // console.log(obj)
            return {
                value:obj,
                label:obj
            }
        })
    }else{
        // let n = [];
        // for (let obj in data){
        //     n.push({
        //         value:obj,
        //         label:obj,
        //         // children:tr(data[obj])
        //     })
        // }
        // return n


        return Object.keys(data).map((obj,index)=>{
            let children = tr(data[obj]);
            return {
                value:obj,
                label:obj,
                children
            }
        })
    }
}
// tr(e);
// console.log(tr(e))

// for(v in e){
//     console.log(e[v])
// }


fs.writeFile('transfered.js',JSON.stringify(tr(e)));

// console.log(e)
