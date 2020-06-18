//user schema
const mongoose = require("mongoose");


//create schema
const categorySchema = new mongoose.Schema(
    {
    //passing object with all the properties and types and required fields
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
        }
    }, 
//created+updated
{timestamps: true}
);

module.exports = mongoose.model("Category", categorySchema);
