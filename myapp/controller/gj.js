exports.getJsonFunc = function(req, res) {
  return res.jsonp({"hello":"world"});
};

