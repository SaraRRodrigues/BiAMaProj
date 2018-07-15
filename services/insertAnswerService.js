var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'putAnswer': putAnswer	
}
function putAnswer( data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var textAnswer = data.text;
		var likes = data.likes;
		var idQuestion = data.idQuestion;
		var idAnswer = data.idAnswer+1;
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query(`INSERT INTO "Answer" VALUES ($1, $2, $3, $4)`, [idAnswer, idQuestion,textAnswer,likes], function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}
