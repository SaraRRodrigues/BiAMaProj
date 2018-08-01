var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'getWorldSharesForum': getWorldSharesForum	
}
function getWorldSharesForum(cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "Share" INNER JOIN "Forum" ON "Share".forum_type="Forum".type_forum INNER JOIN "Library" ON "Library".id_library="Forum".library_id', function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}
