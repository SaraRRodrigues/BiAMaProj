var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'insertFavoriteQuestion': insertFavoriteQuestion, 
	'insertFavoriteAnswer': insertFavoriteAnswer
}
function insertFavoriteQuestion(data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var idFavorite = data.idFavorite;
		var idUser = data.idUser;
		var idMaterial = data.idMaterial;
		var idQuestion = data.idQuestion;
		var idAnswer = data.idAnswer;
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query(`INSERT INTO "Favorite" VALUES ($1, $2, $3, $4, $5)`, [idFavorite, idUser,idMaterial,idQuestion, idAnswer], function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}

function insertFavoriteAnswer(data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var idFavorite = data.idFavorite;
		var idUser = data.idUser;
		var idMaterial = data.idMaterial;
		var idQuestion = data.idQuestion;
		var idAnswer = data.idAnswer;
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query(`INSERT INTO "Favorite" VALUES ($1, $2, $3, $4, $5)`, [idFavorite, idUser,idMaterial,idQuestion, idAnswer], function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}
