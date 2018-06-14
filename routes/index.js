
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

router.get('/biama', (req, resp, next) => {
	userService.getUsers((error, users) => {
		console.log(users)
		resp.json({users})
	});
	
	console.log('Users');
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
