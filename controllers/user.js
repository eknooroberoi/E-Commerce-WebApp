const User = require('../models/user')
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.signup = ( req, res ) => {
    console.log("req.body", req.body);
    const user = new User(req.body);
    //save data in database
    //using call back function to return success or failure
    user.save((err, user) =>{
    if(err){
        return res.status(400).json({
            err: errorHandler(err)
        });
        }
        //we don't want to show salt and hashed password in the db
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};

//postman is used to communicate with api