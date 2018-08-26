var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'getLikeQuestion': getLikeQuestion,
	'updateLikeQuestion': updateLikeQuestion
}
function getLikeQuestion(cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "Question" ORDER BY "Question".id_question ASC', function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}

function updateLikeQuestion(data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var likesQuestion = data.like;
		var idQuestion = data.id_question;
		console.log(data)
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('UPDATE "Question" SET likes_question=$1 WHERE "Question".id_question=$2 ', [likesQuestion, idQuestion], function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}

