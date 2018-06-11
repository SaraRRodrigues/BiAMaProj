import { WSAEUSERS } from 'constants';

var express = require('express');
var router = express.Router();
var path = require('path');

var userService = require('../services/userService');

/* GET home page. */
router.get('/', (req, resp, next) => {
	resp.render('views/index');
});

router.get('/views/:name', (req, resp, next) => {
	resp.render(`views/${req.params.name}`);
});

/*para poder fazer o refresh*/ 
router.get('/BiAMa/:name', (req, resp, next) => {
	resp.render(`views/${req.params.name}`);
});

router.get('/biamaPage', (req, resp, next) => {
	userService.getUsers((error, users) => {

		if(error){
			return error;
	  	}
	 
		/*resp.render('perfilPage', function(html){
			console.log(html)
			resp.send(req.body);
		})*/
		var jsonStr = JSON.stringify(users);
		console.log(jsonStr);
		//return jsonStr;
		//resp.render('perfilPage');

		//resp.render('perfilPage');
		//resp.send({name: 'users'})
		resp.json(jsonStr)
		//resp.next();
		//next(jsonStr);
		//return jsonStr;
	})
});

module.exports = router;
