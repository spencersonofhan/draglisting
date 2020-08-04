var MC = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/testin";

MC.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})
.then(db => {
  var dbo = db.db("testin");
  // dbo.collection('entry').insertOne({title: "test"}, function(err, result) {
  //   db.close();
  // });
  // var myObj = {name: "Larry", address: "Highway 69"};
  dbo.collection("entry").find({}, {projection: {_id: 0} }).toArray(function(err, result) {
    console.log(result);
    db.close();
  })
  // var dbo = db.db("test");
})
.catch(err =>  console.error(err));
