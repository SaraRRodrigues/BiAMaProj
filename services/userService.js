var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
//var pg = require('pg');
//var pgClient = new pg.Client(connectDB);
//var UsersList = require('../model/UsersList');

//pgClient.connect();
const { Client } = require('pg');

const client = new Client({
	connectionString: process.env.DATABASE_URI_HEROKU,
	ssl: true,
});
  
client.connect();

module.exports = {
	'getUsers': getUsers	
}
/*function getUsers(cb){
	console.log('database: ' + process.env.DATABASE_URL)
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
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
}*/
function getUsers(cb){
	client.query('SELECT * FROM "User"', (err, res) => {
		if (err) throw err;
		console.log(res.rows);
		for (let row of res.rows) {
	  		console.log(JSON.stringify(row));
		}
		cb(null, res.rows)
		client.end();
  	});
};