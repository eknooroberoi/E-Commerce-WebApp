//routes

const express = require("express");
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
//loggedin user and authenticated user must have same id ie. a user now can't enter someone elses id and access it
//if we put isAdmin then only if role=1 ie admin can access it
router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

// we want to check parameter,anytime there is parameter userId in the route we want to execute userById method and make user info available in the request object
router.param("userId", userById);


module.exports= router;

