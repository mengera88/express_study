var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};  //cache是用来缓存文件内容的对象

//404错误
function send404(res) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('Error 404: resource not found');
    res.end(); 
}
//提供文件数据服务
function sendFile(res, filePath, fileContents) {
    res.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))});
    res.end(fileContents);
}
//提供静态文件服务.我们的聊天程序就要把静态文件缓存到内存中，只有第一次访问的时候才会从文件系统中读取。下一个辅助函数会确定文件是否缓存了，如果是，就返回它。如果文件还没被缓存，它会从硬盘中读取并返回它。如果文件不存在，则返回一个HTTP 404错误作为响应。
function serveStatic(res, cache, absPath) {
    if(cache[absPath]) {  //检查文件是否缓存在内存中
        sendFile(res, absPath, cache[absPath]);  //从内存中返回文件
    } else {
        fs.exists(absPath, function(exists) { //检查文件是否存在
            if(exists) {
                fs.readFile(absPath, function(err, data) {
                    if(err) {
                        send404(res);
                    } else {
                        cache[absPath] = data;
                        sendFile(res, absPath, data);
                    }
                })
            } else {
                send404(res);
            }
        })
    } 
}