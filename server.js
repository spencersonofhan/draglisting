"use strict";

const express = require('express');
const path = require('path');
const url = require('url-parse');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
require('dotenv/config');

// Express object + ejs engine + body parser
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Serves static files from public folder
app.use('/static', express.static('public'));

// Local Mongoose object
const Post = require('./models/Post');
const mongoose = require('mongoose');
const localMongoose = mongoose.connect(process.env.DB_CONNECTION,
   {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true},
   () => console.log("\n$$$$$$$$$$$$$$\nEasy big money\n$$$$$$$$$$$$$$"));

// IMPORT ROUTES
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
// const authorize = require('./routes/verifyTKN');
app.use('/login', authRoute);
app.use('/categories', postsRoute);




// ROUTES
app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/goals', function(req, res) {
  res.render('goals.ejs');
});

app.get('/blog', function(req, res) {
  res.render('blog.ejs');
});

app.get('/blog/entry', function(req, res) {
  var parsedUrl = new url(req.protocol + '://' + req.get('host') + req.originalUrl, true);

  var post = new Post({
    type: parsedUrl.query.type,
    title: parsedUrl.query.title,
    creator: parsedUrl.query.creator,
    description: parsedUrl.query.tarea,
    rating: parsedUrl.query.rating,
  });

  post.save()
  .catch(MongoError => {
      res.status(400).send(MongoError);
  });
});

app.get('/blog/api', async(req, res) => {
  try {
        var posts = await Post.find().limit(10).sort({_id:-1});
        res.json(posts);
  }
  catch(err) {
      console.error(err);
  }
})

app.listen(8080);
