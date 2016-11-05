var mysql = require('mysql');
var settings = require('../settings');


var connection = mysql.createConnection({
    host: settings.mysql.host,
    port: settings.mysql.port,
    database: settings.mysql.database,
    user: settings.mysql.user,
    password: settings.mysql.password,
    charset: "utf8" 
});



module.exports = connection;

