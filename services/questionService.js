var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'getMyQuestions': getMyQuestions,
	'getAllMyQuestions': getAllMyQuestions
}
function getMyQuestions(cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "Question"', function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}

function getAllMyQuestions(data, cb) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var userId=data;
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		
		client.query('SELECT * FROM "Library_User" INNER JOIN "Forum" ON "Library_User".library_id="Forum".library_id INNER JOIN "Question" ON "Question".forum_type="Forum".type_forum WHERE "Library_User".user_id=$1', [userId], function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}
