//routes

const express = require("express");
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, read, update } = require("../controllers/user");
//loggedin user and authenticated user must have same id ie. a user now can't enter someone elses id and access it
//if we put isAdmin then only if role=1 ie admin can access it
router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});


//allow the user to see and update profile
//see
router.get("/user/:userId", requireSignin, isAuth, read);
//update
router.put("/user/:userId", requireSignin, isAuth, update);

// we want to check parameter,anytime there is parameter userId in the route we want to execute userById method and make user info available in the request object
router.param("userId", userById);


module.exports= router;

