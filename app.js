const express = require('express');
// import mongoose
const mongoose = require('mongoose');
// load env variables
const dotenv = require('dotenv');
dotenv.config()

//import routes
const userRoutes = require("./routes/user");

//app
const app = express();


//db connection
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

//routes middleware
//localhost:8000/api
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () =>{
    console.log(`Server isrunning on port ${port}`);
});


