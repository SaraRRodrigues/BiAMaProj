var express = require('express');
var router = express.Router();

var userService = require('../services/userService');

/* GET home page. */
router.get('/', (req, resp, next) => {
  	userService.getUsers((error, users) => {

  		if(error){
  			return error;
		}
  		resp.render('index', users);
  	})
});

module.exports = router;
