//routes

const express = require("express");
const router = express.Router();
//create= to create new category
const { create, categoryById, read, update, remove, list } = require("../controllers/category");

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//read
router.get("/category/:categoryId", read);
router.post("/category/create/:userId", requireSignin, isAdmin, isAuth , create);
//update
router.put("/category/:categoryId/:userId", requireSignin, isAdmin, isAuth, update);
//delete we can not use word delete coz it is reserved keyword in Javascript therefore use remove
router.delete("/category/:categoryId/:userId", requireSignin, isAdmin, isAuth , remove);
//get all categories
router.get("/categories", list);

router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports= router;