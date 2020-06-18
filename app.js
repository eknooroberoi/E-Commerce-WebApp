const express = require('express');
// import mongoose
const mongoose = require('mongoose');
//morgan is used as middleware
const morgan = require("morgan");
const bodyParser = require("body-parser");

//coz we will save user credentials in cookie
const cookieParser = require("cookie-parser");
//express-validator- to validate data,example if user did not provide email or password or any of the required fields then we can send them friendly error message
const expressValidator = require("express-validator");

// load env variables
require('dotenv').config();

//import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");


//app
const app = express();


//db connection
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => console.log('DB Connected'));

//middlewares
app.use(morgan("dev"))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());


//routes middleware
//localhost:8000/api
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});


