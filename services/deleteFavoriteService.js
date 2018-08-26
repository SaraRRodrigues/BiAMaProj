var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'deleteFavoriteQuestion': deleteFavoriteQuestion,
	'deleteFavoriteAnswer': deleteFavoriteAnswer	
}
function deleteFavoriteQuestion(data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        console.log('value2: ', data);
		var idQuestion = data.idQuestion;
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query(`DELETE FROM "Favorite" WHERE "Favorite".question_id=$1`, [idQuestion], function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}

function deleteFavoriteAnswer(data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        console.log('value2: ', data);
		var idAnswer = data.idAnswer;
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query(`DELETE FROM "Favorite" WHERE "Favorite".answer_id=$1`, [idAnswer], function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}

