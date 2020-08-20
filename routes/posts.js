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

router.get('/movies', (req, res) => {
    res.send('big money');
});

router.get('/books', (req, res) => {
    res.send('big money');
});

router.get('/vgs', (req, res) => {
    res.send('big money');
});

router.get('/albums', (req, res) => {
    res.send('big money');
});

module.exports = router;
