var express = require('express');
var router = express.Router();
var path = require('path');

var userService = require('../services/userService');

/* GET home page. */
router.get('/', (req, resp, next) => {
	
	  resp.render('index');
});

router.get('/perfilPage', (req, resp, next) => {
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

/*router.post('/perfilPage', (req, resp, next) => {
	
	console.log(req);
	//resp.render('perfilPage', req);
	  
});*/
module.exports = router;
