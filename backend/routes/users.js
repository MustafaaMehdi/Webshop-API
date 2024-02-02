var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('WELCOME to the GET method in users route');
});

module.exports = router;
