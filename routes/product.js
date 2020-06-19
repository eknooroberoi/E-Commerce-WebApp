//routes

const express = require("express");
const router = express.Router();

//create= to create new category
const { create, productById, read, remove } = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { route } = require("./auth");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAdmin, isAuth , create);
router.delete("/product/:productId/:userId", requireSignin, isAdmin, isAuth, remove);

router.param("userId", userById);
router.param("productId", productById);

module.exports= router;