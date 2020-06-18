//routes

const express = require("express");
const router = express.Router();

const {
    //create= to create new category
    create 
 } = require("../controllers/category");


router.post("/category/create", create);


module.exports= router;