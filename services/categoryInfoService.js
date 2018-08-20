var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'getCategories': getCategories,
	'insertMaterialDetails': insertMaterialDetails
}
function getCategories(cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "Material" ORDER BY "Material".id ASC', function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}

function insertMaterialDetails(data, cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var idMaterial = data.idMaterial;
		var type = data.type;
		var color = data.color;
		var code = data.code;
		var name = data.name;
		var category = data.category;
		var description = data.description;
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query(`INSERT INTO "Material" VALUES ($1, $2, $3, $4, $5, $6, $7)`, [idMaterial, type, color, code, name, category, description], function(err, result) {
			done();
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}
