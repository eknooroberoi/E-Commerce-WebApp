const express = require('express');
// import mongoose
const mongoose = require('mongoose');
//morgan is used as middleware
const morgan = require("morgan");
const bodyParser = require("body-parser");

//coz we will save user credentials in cookie
const cookieParser = require("cookie-parser");


// load env variables
require('dotenv').config();

//import routes
const userRoutes = require("./routes/user");

//app
const app = express();


//db connection
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => console.log('DB Connected'));

//middlewares
app.use(morgan("dev"))
app.use(bodyParser.json());
app.use(cookieParser());


//routes middleware
//localhost:8000/api
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});


