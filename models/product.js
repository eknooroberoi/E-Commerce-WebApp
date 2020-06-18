//user schema
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

//create schema
const productSchema = new mongoose.Schema(
    {
    //passing object with all the properties and types and required fields
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
        },
    description: {
        type: String,
        required: true,
        maxlength: 2000
        },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
        },
    category: {
        type: ObjectId, //when we refer to project category, it will go to category model. type: mongooseSchema.ObjectId
        ref: 'Category', // relationship between 2 models, product will have category mongooseSchema type, it refers to category model
        required: true
        },
    quantity: { //increment or decrement quantity, when we sell products,(stuff management as Admin)
        type: Number
        },
    photo: {
        data: Buffer,
        contentType: String
        },
    shipping: {
        required: false,
        type: Boolean //shipping is always true or false
        }
    }, 
//created+updated
{timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);
