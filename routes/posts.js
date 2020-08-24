"use strict";

// https://www.youtube.com/watch?v=vjf774RKrLc&t
// Routes idea from here ^^^

const express = require('express');
const router = express.Router();
const authorize = require('./verifyTKN');
const app = express();
app.set('view engine', 'ejs');
// OPTIMIZE: ^^

router.get('/', authorize, (req, res) => {
    res.render('categories.ejs');
});

router.get('/movies', authorize, (req, res) => {
    res.send('big money');
});

router.get('/books', authorize, (req, res) => {
    res.send('big money');
});

router.get('/vgs', authorize, (req, res) => {
    res.send('big money');
});

router.get('/albums', authorize, (req, res) => {
    res.send('big money');
});

router.get('/blogs', authorize, (req, res) => {
    res.send('big money');
});

module.exports = router;
