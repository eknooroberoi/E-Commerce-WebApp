const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

const Product = require("../models/product");
const { result } = require("lodash");
const { errorHandler } = require('../helpers/dbErrorHandler');

//we need to send form data because we have to handle image upload, when creating new category we can access anything we needed from request body
//but can't do this because we are handling image upload also, we need to send form data whether from client whether it is from react or postman
//we need to use form data, in order to use form data and all the files coming with it, we need to use package called formidable, other packages example: matla package to handle image upload
//also used lodash library
//created form is sent from react or postman
exports.create = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err, fields, files) => {
        if(err)
        {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        let product = new Product(fields); //name,description etc
        if(files.photo){
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        product.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });

    });
};