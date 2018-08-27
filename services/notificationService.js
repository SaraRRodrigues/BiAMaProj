var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'getMyNotifications': getMyNotifications,
	'getAllNotifications': getAllNotifications,
	'insertMyNotifications': insertMyNotifications	
}
function getMyNotifications(data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var userId = data;
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "Notification" WHERE "Notification".id_user=$1',[userId], function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}

function getAllNotifications(cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "Notification" ORDER BY "Notification".id_notification', function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}

function insertMyNotifications(data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var idNotification = data.id_notification;
		var textNotification = data.text_notification;
		var dateNotification = data.date_notification;
		var insertNotification = data.insert_notification;
		var idUser = data.id_user;
		console.log('data of service: '), data;
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('INSERT INTO "Notification" VALUES ($1, $2, $3, $4, $5)',[idNotification, textNotification, dateNotification, insertNotification, idUser], function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}
