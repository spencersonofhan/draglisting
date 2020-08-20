"use strict";
// https://www.youtube.com/watch?v=2jqok-WgelI
// Authorization idea from here ^^^

const express = require('express');
const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {ValidifyNewUser, ValidifyLogin} = require('../models/Validation');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// LOGIN
router.post('/', async(req, res) => {
    // Validate POST data
    const valid = ValidifyLogin(req.body);
    // Catch block executed if the POST data conforms to userSchema
    try {
        return res.status(400).send(valid['error'].details[0].message);
    }
    catch(validationOK) {
        ;
    }

    // Check email has linked account
    const usernameCheck = await User.findOne({username: req.body.username});
    if (!usernameCheck) { return res.status(400).send("Email or password is incorrect"); }
    // if (!usernameCheck) { return res.status(400).send("username"); }

    // Check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, usernameCheck.password);
    if(!validPassword) { return res.status(400).send("Email or password is incorrect");}
    // if(!validPassword) { return res.status(400).send("password"); }

    // Create and send authentication token
    // const token = jwt.sign({_id: usernameCheck._id}, process.env.SUPER_SECRET_TKN, {expiresIn: '1h'});
    const token = jwt.sign({_id: usernameCheck._id}, process.env.SUPER_SECRET_TKN, {expiresIn: '1m'});
    res.header('Set-Cookie', "auth-token=" + token).sendStatus(200);
    // res.header('auth-token', token).end();
});

// CREATE USER
router.post('/register', async(req, res) => {
    // FUTURE: test leading and trailing whitespace. error if it exists
    // Validate POST data
    const valid = ValidifyNewUser(req.body);
    // Catch block executed if the POST data conforms to userSchema
    try {
        return res.status(400).send(valid['error'].details[0].message);
    }
    catch(validationOK) {
        ;
    }

    // Check if email is already in use
    const usernameCheck = await User.findOne({email: req.body.email});
    if (usernameCheck) {
        return res.status(400).send('Email is already in use');
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        age: req.body.age,
        email: req.body.email,
        password: encryptedPassword
    });
    try {
        const savedUser = await user.save();
        res.status(200).send({user: user._id});
    }
    catch (err){
        res.status(400);
    }

    // REMOVE BEFORE PUSH
    console.log(user);
});

module.exports = router;
