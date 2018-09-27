var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'putQuestion': putQuestion	
}
function putQuestion(data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var textQuestion = data.text;
		var likes = data.likes;
		var idQuestion = data.idQuestion;
		var forum = data.forum;
		console.log('data: ',data);
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query(`INSERT INTO "Question" VALUES ($1, $2, $3, $4)`, [ idQuestion,textQuestion,likes, forum], function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}
