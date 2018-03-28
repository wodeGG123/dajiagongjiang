//express_demo.js 文件
var express = require('express');
var path = require('path');
var app = express();


app.use(express.static(path.join(__dirname, '/')));
app.get('/', function (req, res) {
   // res.send('Hello World');
   res.sendFile(__dirname + '/index.html');
})

var server = app.listen(80, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})