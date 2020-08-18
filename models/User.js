"use strict";

const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if ( value < 0) {
                throw new Error("Age must be a positive number");
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid!");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// UserSchema.methods.newAuthToken = async function(){
//     const user = this;
//     const token = jwt.sign({_id: user.id.toString()}, 'thisisatest', {expiresIn: "7 days"});
//     user.tokens = user.tokens.concat({token});
//     await user.save();
// }

const User = mongoose.model('User', UserSchema);

module.exports = User;
