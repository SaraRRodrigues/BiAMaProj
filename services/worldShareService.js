var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'getMyWorldShares': getMyWorldShares,
	'insertWorldShares': insertWorldShares,
	'getAllMyWorldShares': getAllMyWorldShares
}
function getMyWorldShares(cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "Share" INNER JOIN "Forum" ON "Forum".type_forum="Share".forum_type', function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}
function insertWorldShares(data, cb){
	var forumType = data.forumType;
	var title = data.title;
	var image = data.image;
	var description = data.description;

	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('INSERT INTO "Share" VALUES($1, $2, $3, $4)', [forumType,title,image,description], function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}

function getAllMyWorldShares(cb) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "Library_User" INNER JOIN "Forum" ON "Library_User".library_id="Forum".library_id INNER JOIN "Share" ON "Share".forum_type="Forum".type_forum', function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}