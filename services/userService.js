var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'getUsers': getUsers,
	'updateUserSettings': updateUserSettings,
	'getMyQuestionsLogged': getMyQuestionsLogged
}
function getUsers(cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "User"', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}

function updateUserSettings(data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var idUser=data.idUser;
		var name=data.name;
		var email=data.email;
		var birthdate=data.birthdate;
		var image=data.image;
		var username=data.username;
		var password=data.password;
		
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('UPDATE "User" SET id=$1, name=$2, email=$3, birthdate=$4, image=$5, username=$6,password=$7 WHERE id=$1',[idUser, name, email, birthdate, image, username, password], function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}

function getMyQuestionsLogged(cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		
		client.query('SELECT * FROM "User" INNER JOIN "Library_User" ON "User".id="Library_User".user_id INNER JOIN "Forum" ON "Library_User".library_id="Forum".library_id INNER JOIN "Question" ON "Forum".type_forum="Question".forum_type', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}
