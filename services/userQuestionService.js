var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'getQuestionAnswer': getQuestionAnswer,
	'getUserQuestion': getUserQuestion
		
}
function getQuestionAnswer(cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "Question" INNER JOIN "Answer" ON "Question".id_question="Answer".id_question ORDER BY "Question".id_question ASC', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}

function getUserQuestion(cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "Question" ORDER BY "Question".id_question ASC', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}
