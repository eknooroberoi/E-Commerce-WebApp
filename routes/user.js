//routes

const express = require("express");
const router = express.Router();
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
//once user is logged in he can see his profile as well as other people profile like facebook
router.get("/secret/:userId", requireSignin, (req, res) => {
    res.json({
        user: req.profile
    });
});

// we want to check parameter,anytime there is parameter userId in the route we want to execute userById method and make user info available in the request object
router.param("userId", userById);


module.exports= router;

//2 middlewares required
//1. authenticated user currently logged in (isauth)
//2. for admin currently logged in, if user is admin then only he can access certain routes (isadmin)