"use strict";

// const MC = require('mongodb').MongoClient;
const express = require('express');
const path = require('path');
const url = require('url');
const bodyParser = require('body-parser');
const Post = require('./models/Post');
require('dotenv/config');

// Express object + ejs engine + body parser
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serves static files from public folder
app.use('/static', express.static('public'));

// Mongoose object
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION,
   {useUnifiedTopology: true, useNewUrlParser: true},
   () => console.log("Big money easy money"));


// IMPORT ROUTES
const postsRoute = require('./routes/posts');
app.use('/categories', postsRoute);

// ROUTES
app.get('/', function(req, res) {
  res.render('index.ejs');
});

// app.get('/style.css', function(req, res) {
//   res.sendFile(path.join(__dirname, '/public/style.css'));
//
// });

app.get('/goals', function(req, res) {
  res.render('goals.ejs');
});

app.get('/blog', function(req, res) {
  res.render('blog.ejs');
});

app.post('/blog', function(req, res) {
  const post = new Post({
    title: req.body.title,
    creator: req.body.creator,
    description: req.body.description,
  });

  post.save()
  .then(data => {
    res.json(data);

  })
  .catch(err => {
    res.json({message: err});
  });

//   MC.connect(mcUrl, {useUnifiedTopology: true, useNewUrlParser: true})
//   .then(db => {
//     var dbo = db.db("draglisting");
//     dbo.collection('entry').insertOne({type: tempType, title: tempTitle, creator: tempCreator, tArea: temptArea},
//        function(err, result) {
//       db.close();
//     });
//   })
//   .catch(err =>  console.error(err));
});

app.listen(8080);
