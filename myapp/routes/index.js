var express = require('express');
var router = express.Router();
var gj = require('../controller/gj');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data', gj.getJsonFunc);

module.exports = router;
