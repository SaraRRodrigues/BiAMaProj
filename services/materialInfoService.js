var connectDB = "postgres://BiAMa:1234@localhost/BiAMaDB";
var pg = require('pg');

module.exports = {
	'getMaterials': getMaterials
}
function getMaterials(cb){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM "Material" INNER JOIN "Library_Material" ON "Library_Material".material_id="Material".id INNER JOIN "Library" ON "Library".id_library="Library_Material".library_id ORDER BY "Material".id ASC', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			cb(null, result.rows)
		});
	});
}

