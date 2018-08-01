var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'deleteFavoriteQuestion': deleteFavoriteQuestion	
}
function deleteFavoriteQuestion(data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        console.log('value2: ', data);
		var idMaterial = data.idFavorite;
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query(`DELETE FROM "Favorite" WHERE "Favorite".id_favorite=$1`, [idMaterial], function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}
