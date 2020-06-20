//routes

const express = require("express");
const router = express.Router();

//create= to create new category
const { create, productById, read, remove, update, list, listRelated, listCategories, listBySearch, photo } = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { route } = require("./auth");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAdmin, isAuth , create);
router.delete("/product/:productId/:userId", requireSignin, isAdmin, isAuth, remove);
router.put("/product/:productId/:userId", requireSignin, isAdmin, isAuth, update);
//method list will list out all the products
router.get("/products", list);
//based on product id fetch related products
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
//why post? we will be sending objects, filter, how we are going to filter the products, the categories, price range in the req body
//therefore to access product body we have to use post method
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

router.param("userId", userById);
router.param("productId", productById);

module.exports= router;