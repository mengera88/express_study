// exports.getJsonFunc = function(req, res) {
//   return res.jsonp({"hello":"world"});
// };

var getJsonFunc = function(req, res) {
  return res.jsonp({"hello":"world"});
}

module.exports = getJsonFunc;



// var database = require('./database.js');

// var get
// database.connect();

// database.query('select * from local_users', function(err, rows) {
//     if(err) throw err;

//     console.log("SELECT ==>");
//     console.log(rows[3]);
// });

// database.end();
