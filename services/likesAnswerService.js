var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'getLikeAnswer': getLikeAnswer,
	'updateLikeAnswer': updateLikeAnswer	
}
function getLikeAnswer(cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "Answer" ORDER BY "Answer".id_answer ASC', function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}

function updateLikeAnswer(data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var likesAnswer = data.like;
		var idAnswer = data.id_answer;
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('UPDATE "Answer" SET likes_answer=$1 WHERE "Answer".id_answer=$2 ', [likesAnswer, idAnswer], function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}
