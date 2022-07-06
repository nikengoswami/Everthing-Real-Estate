const express = require("express");
const app = express();
const errorMiddleware= require("./middlewear/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require('dotenv');

dotenv.config({path:"../backend/config/config.env"});

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Route Imports
const property = require("./routes/propertyRoute");
const user = require("./routes/userRoute"); 
const payment = require("./routes/paymentRoute"); 

app.use("/api/v1",property);
app.use("/api/v1",user);
app.use("/api/v1",payment);

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;