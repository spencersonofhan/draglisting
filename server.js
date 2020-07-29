const express = require('express');
const path = require('path');
const url = require('url');
const bodyParser = require('body-parser');
const app = express();
const sanitize = require('mongo-sanitize');
const MC = require('mongodb').MongoClient;
const mcUrl = "mongodb://localhost:27017/blogs";
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index.ejs');
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

// URL for submitting a blog entry
app.get('/blog/entry', function(req, res) {
  // Gets the params from the url
  let entryInput = url.parse(req.url, true).query;
  let tempType = sanitize( entryInput['type']);
  let tempTitle = sanitize(entryInput['title']);
  let tempCreator = sanitize(entryInput['creator']);
  let temptArea = sanitize(entryInput['tarea']);

  // Connects to the local Mongo database and inserts a new item
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
