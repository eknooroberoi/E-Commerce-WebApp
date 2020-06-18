//bring in user model
const User = require("../models/user");

exports.userById = (req, res, next, id) => {
    //either get user or get error
    User.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    });
};