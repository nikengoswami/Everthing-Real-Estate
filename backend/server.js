const app = require('./app');
const dotenv = require('dotenv');
const cloudinary = require("cloudinary");
const connectDatabase = require('./config/database');

//Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server because of Uncaught Exception");
    server.close(()=>{
        process.exit(1);
    })
})

//config
dotenv.config({path:"../backend/config/config.env"});
const port = process.env.PORT;

//connecting to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

app.get("/",(req,res)=>{
    res.send("<h1>Hello</h1>");
})

const server = app.listen(port,()=>{
    console.log(`Server Started on port : ${port}`);
})

//Unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server because of Unhandled promise rejection");
    server.close(()=>{
        process.exit(1);
    })
})