
var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'getMyFavorites': getMyFavorites,
	'getAllFavorites': getAllFavorites	
}
function getMyFavorites(data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var userId = data;
		console.log('userid: ', userId);
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "Favorite" WHERE "Favorite".user_id=$1 ORDER BY "Favorite".question_id ASC',[userId], function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}
function getAllFavorites(cb) {
	var d = Date.now();
	console.log(d);
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		
		client.query('SELECT * FROM "Favorite" ORDER BY "Favorite".id_favorite', function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			var d1 = Date.now();
			console.log(d1 - d);
			cb(null, result.rows)
		});
	
	});

}
