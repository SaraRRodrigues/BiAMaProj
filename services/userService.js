var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'getUsers': getUsers,
	'updateUserSettings': updateUserSettings,
	'getMyQuestionsLogged': getMyQuestionsLogged,
	'insertUserSettings': insertUserSettings,
	'insertLibraryUserDetails': insertLibraryUserDetails,
	'getLibraryUserDetails': getLibraryUserDetails,
	'insertMyBiama': insertMyBiama
}
function getUsers(cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "User" ORDER BY "User".id ASC', function(err, result) {
			done();
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
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}

function insertUserSettings(data, cb){
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
		client.query('INSERT INTO "User" VALUES ($1,$2,$3,$4,$5,$6,$7)',[idUser, name, email, birthdate, image, username, password], function(err, result) {
			done();
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
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}

function getLibraryUserDetails(data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query(`SELECT * FROM "Library_User"`, function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}

function insertLibraryUserDetails(data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var idLibraryDetail = data.idLibrary;
		var idUserDetail = data.idUser;
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query(`INSERT INTO "Library_User" VALUES ($1, $2)`, [idLibraryDetail, idUserDetail], function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}

function insertMyBiama(data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var idLibrary = data.idLibrary;
		var location = data.location;
		var description = data.description;
		var locationDescription = data.locationDescription;
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query(`INSERT INTO "Library" VALUES ($1, $2, $3, $4)`, [idLibrary, location, description, locationDescription], function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});

}

