//routes

const express = require("express");
const router = express.Router();

//create= to create new category
const { create, productById, read, remove, update, list } = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { route } = require("./auth");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAdmin, isAuth , create);
router.delete("/product/:productId/:userId", requireSignin, isAdmin, isAuth, remove);
router.put("/product/:productId/:userId", requireSignin, isAdmin, isAuth, update);
//method list will list out all the products
router.get("/products", list);

router.param("userId", userById);
router.param("productId", productById);

module.exports= router;