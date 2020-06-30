const express = require('express');
const path = require('path');
const url = require('url');
const bodyParser = require('body-parser');
const app = express();
const MC = require('mongodb').MongoClient;
const mcUrl = "mongodb://localhost:27017/draglisting"


app.use('/static', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/blog', function(req, res) {
  res.sendFile(path.join(__dirname, '/blog.html'));
});

app.get('/categories', function(req, res) {
  res.sendFile(path.join(__dirname, '/categories.html'));
});

app.get('/goals', function(req, res) {
  res.sendFile(path.join(__dirname, '/goals.html'));
});

app.post('/blog/entry', function(req, res) {
  var tempTitle = req.body.title;
  var tempCreator = req.body.creator;
  var temptArea = req.body.tArea;

  MC.connect(mcUrl, {useUnifiedTopology: true, useNewUrlParser: true})
  .then(db => {
    var dbo = db.db("draglisting");
    dbo.collection('entry').insertOne({title: tempTitle, creator: tempCreator, tArea: temptArea}, function(err, result) {
      db.close();
    });
  })
  .catch(err =>  console.error(err));
})

app.listen(8080);
