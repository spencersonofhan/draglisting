"use strict";

const Joi = require('@hapi/joi');

// Change "name" to username, i dont want their real name

const ValidifyNewUser = (data) => {
    const userSchema = Joi.object({
        username: Joi.string().min(5).required(),
        age: Joi.number().integer().min(18).max(115),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return userSchema.validate(data);
};

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Change due to different context
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const ValidifyLogin = (data) => {
    const userSchema = Joi.object({
        username: Joi.string().min(5).required(),
        password: Joi.string().min(6).required(),
    });
    return userSchema.validate(data);
};


module.exports.ValidifyNewUser = ValidifyNewUser;
module.exports.ValidifyLogin = ValidifyLogin;
