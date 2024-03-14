var express = require('express');
const connection = require('../config/database');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// temporary



module.exports = router;
