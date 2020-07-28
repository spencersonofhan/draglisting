const express = require('express');
const path = require('path');
const url = require('url');
const bodyParser = require('body-parser');
const app = express();
const MC = require('mongodb').MongoClient;
const mcUrl = "mongodb://localhost:27017/blogs"

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
  res.sendFile(path.join(__dirname, '/public/style.css'));
});

app.get('/style.css', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/style.css'));
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

app.get('/blog/entry', function(req, res) {
  let entryInput = url.parse(req.url, true).query;
  let tempType = entryInput['type'];
  let tempTitle = entryInput['title'];
  let tempCreator = entryInput['creator'];
  let temptArea = entryInput['tarea'];

  

  MC.connect(mcUrl, {useUnifiedTopology: true, useNewUrlParser: true})
  .then(db => {
    var dbo = db.db("blogs");
    dbo.collection('blogs').insertOne({type: tempType, title: tempTitle, creator: tempCreator, tArea: temptArea}, function(err, result) {
      db.close();
    });
  })
  .catch(err =>  console.error(err));
})

app.listen(8080);
