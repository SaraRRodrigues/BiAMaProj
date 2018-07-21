var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'getLikeAnswer': getLikeAnswer	
}
function getLikeAnswer(cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "Answer" ORDER BY "Answer".id_answer ASC', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}