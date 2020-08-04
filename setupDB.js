var MC = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MC.connect(url, {useUnifiedTopology: true, useNewUrlParser: true} )
.then(db => {
	var dbo = db.db("blogs");
	console.log("Database \'blogs\' created!");

	dbo.createCollection("blogs", function(err, res) {
		console.log("(With collection \'blogs\' made\)");
		db.close();
	})
})
.catch(err => console.error(err));

