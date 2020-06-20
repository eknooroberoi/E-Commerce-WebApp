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

exports.read =(req,res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};


//newly updated records are sent to front end as json response
exports.update = (req, res) => {
    User.findOneAndUpdate(
        {_id: req.profile._id}, 
        {$set: req.body}, 
        {new: true}, 
        (err, user) => {
            if(err) {
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        }
        );
};