//user schema
const mongoose = require("mongoose");

//nodejs module to hash passwords= crypto
const crypto = require("crypto");

//used package UUID to generate unique strings
const uuidv1= require("uuid/v1");

//create schema
const userSchema = new mongoose.Schema({
    //passing object with all the properties and types and required fields
    name: {
        type: String,
        //any space in the beginning and end will be removed
        trim: true,
        //we need name to be required
        required: true,
        maxlength: 32
        },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 32
        },
    //we are going to save hashed version of the password, for this we will use virtual fields, schemas help us to add methods, virtual fields, we take password from client but when we save it, we save hashed version of it
    hashed_password: {
        type: String,
        required: true
        },
    //info about client will be used for making their profile
    about: {
        type: String,
        trim: true
        },
    //salt- is long unique string, we will use uuid package for that
    salt: String,
    // 2 types of users===>           1)admin 1-admin                 2)other users/clients 0- authenticated user/regular user
    role: {
        type: Number,
        default: 0
        },
    //history- later when users perchase items, he can see his previous purchases in history
    history: {
        type: Array,
        default: []
        }
        //timestamps contains updated at, created at fields automatically
}, 
{timestamps: true}
);
