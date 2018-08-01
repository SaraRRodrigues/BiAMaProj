var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'insertFavoriteQuestion': insertFavoriteQuestion	
}
function insertFavoriteQuestion(data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        console.log('value: ', data);
		var idFavorite = data.idFavorite;
		var idUser = data.idUser;
		var idMaterial = data.idMaterial;
		var idQuestion = data.idQuestion
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query(`INSERT INTO "Favorite" VALUES ($1, $2, $3, $4)`, [idFavorite, idUser,idMaterial,idQuestion], function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}
