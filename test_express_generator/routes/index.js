var express = require('express');
var router = express.Router();
var dd_tongji = require('../controller/dd_tongji.js'); //引入自定义模块

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data', dd_tongji.get_click);

module.exports = router;
