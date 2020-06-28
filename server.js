const express = require('express');
const path = require('path');

const app = express();
app.use('/static', express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get(/blog/, function(req, res) {
  res.sendFile(path.join(__dirname, '/blog.html'));
});

app.get(/categories/, function(req, res) {
  res.sendFile(path.join(__dirname, '/categories.html'));
});

app.get(/goals/, function(req, res) {
  res.sendFile(path.join(__dirname, '/goals.html'));
});

// app.get('/index.html', function(req, res) {
//   res.sendFile(path.join(__dirname, '/index.html'));
// })

app.listen(8080);
