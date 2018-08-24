var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'getMyNotifications': getMyNotifications	
}
function getMyNotifications(data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var userId = data;
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "Library_User" INNER JOIN "Forum" ON "Library_User".library_id="Forum".library_id INNER JOIN "Notification" ON "Notification".forum_type="Forum".type_forum WHERE "Library_User".user_id=$1',[userId], function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}
