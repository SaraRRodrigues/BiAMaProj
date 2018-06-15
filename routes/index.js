
var express = require('express');
var router = express.Router();
var path = require('path');

var userService = require('../services/userService');

/* GET home page. */
router.get('/', (req, resp, next) => {
	userService.getUsers(( error, users) => {
		//console.log('Users: ' , users)
	});
	resp.render('views/index');
});

router.get('/users', (req, resp, next) => {
	userService.getUsers((error, users) => {
		resp.json({users})
	});
	//resp.render(`views/${req.params.name}`);
});

router.get('/views/:name', (req, resp, next) => {
	resp.render(`views/${req.params.name}`);
});

/*para poder fazer o refresh*/ 
router.get('/BiAMa/:name', (req, resp, next) => {
	resp.render(`views/${req.params.name}`);
});

module.exports = router;
