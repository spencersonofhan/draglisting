const express = require('express');
const path = require('path');
const url = require('url');
const bodyParser = require('body-parser');

const app = express();

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
  console.log(req.body);
  // var title = req.body.title;
  // var creator = req.body.creator;
  // var tArea = req.body.tArea;
  // console.log(title + " " + creator + " " + tArea);
  res.sendFile(path.join(__dirname, '/entry.html'));
})

// app.get('/index.html', function(req, res) {
//   res.sendFile(path.join(__dirname, '/index.html'));
// })

app.listen(8080);
