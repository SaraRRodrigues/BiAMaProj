var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');
var pgClient = new pg.Client(connectDB);
//var UsersList = require('../model/UsersList');

pgClient.connect();

module.exports = {
	'getUsers': getUsers	
}
function getUsers(cb){

	pg.connect(connectDB, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "User"', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});

	function reqAsJson(data, cb) {

		const obj = JSON.parse(data.toString());
		console.log('strinngsss: ' , obj);
		cb(null, data);
	}
}