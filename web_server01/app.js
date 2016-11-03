var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send("Hello World!gj");
});
// 网站首页接受 POST 请求
app.post('/', function (req, res) {
  res.send('Got a POST request');
});


var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log(host, port);
})