const User = require('../models/user')

const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt");// for authorization check
const { errorHandler } = require('../helpers/dbErrorHandler');

//signup
exports.signup = ( req, res ) => {
    //console.log("req.body", req.body);
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


//signin
exports.signin = (req,res) => {
    //find the user based on email
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User with that email does not exist. Please Signup"
            });
        }
        // if user is found make sure the email and password match
        //we get plain password from request body, we need to hash that password and then check, 
        //reuse encryptPassword from user.js models, this will encrypt the password and 
        //we check if the plain password that is now encrypted matches with the one present in database, then we authenticate the user
        //create authenticate method in user model
        //401 not able to authenticate
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password don't match"
            });
        }


        //generate a signed token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        //once we have the token we can persist the token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999});
        //return response with user and token to frontend client
        //destructure, 
        const {_id, name, email, role} = user; //from user
        return res.json({token, user: {_id, email, name, role}}); //we destructured it, so that we don't have to use user.id,user.name etc

    });

};

//signout
//we need to clear cookie from response
//when we sign the user in, we put token in response cookie, now we will clear that cookie from response
exports.signout = (req, res) => {
    res.clearCookie('t')
    res.json({message: "Signout success" });
};

//requireSignin used as a middleware to protect routes so that unknown user can't access it, user can't access it without signin
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

//2 middlewares required
//1. authenticated user currently logged in (isauth)
//2. for admin currently logged in, if user is admin then only he can access certain routes (isadmin)

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){
        return res.status(403).json({
            error: "Access denied"
        });
    }
    next();
};


exports.isAdmin = (req, res, next) => {
    //1=admin 0-not admin
    //403=unaurtharised
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "Admin resourse! Access denied"
        });
    }
    next();
};

