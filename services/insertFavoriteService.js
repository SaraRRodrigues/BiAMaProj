var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'insertFavoriteQuestion': insertFavoriteQuestion	
}
function insertFavoriteQuestion(data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        console.log('value: ', data);
		var question_id = data.idQuestion;
		var material_id = data.idMaterial;
		var user_id = data.idUser;
        var id = data.idFavorite+1;
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query(`INSERT INTO "Favorite" VALUES ($1, $2, $3, $4)`, [id, user_id,material_id,question_id], function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}
