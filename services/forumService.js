var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'getForum': getForum
}
function getForum(cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "Forum"', function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}