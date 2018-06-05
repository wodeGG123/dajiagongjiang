var e = require('./areas.json')
var fs = require('fs');

var o = [];

function tr(data){
    if(data instanceof Array){
        return data.map((obj,index)=>{
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
fs.writeFile('transfered.js',JSON.stringify(tr(e)));
