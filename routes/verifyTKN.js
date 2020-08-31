"use strict";

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Jerry-rigged cookie string parser. Only works if 'auth-token is the first cookie'
    // FUTURE: switch to using the Authorization header with the Bearer schema
    var cookieS = req.header('cookie');
    if (cookieS === undefined){ return res.status(401).send('Access Denied'); }
    const token = cookieS.substring(cookieS.search("auth-token") + 11, cookieS.indexOf(";"));

    if (!token) { return res.status(401).send('Access Denied'); }

    try {
        const verified = jwt.verify(token, process.env.SUPER_SECRET_TKN);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).send('Invalid token');
    }
}
