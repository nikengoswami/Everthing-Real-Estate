const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    sellRent :{
        type : String,
        required : [true,"please select Sell/Rent option"]
    },
    propertyType :{
        type : String,
        required : [true,"please enter property type"]
    },
    location :{
        type : String,
        required : [true,"please enter property location"]
    },
    city :{
        type : String,
        required : [true,"please enter your city name"]
    },
    price :{
        type : Number,
        required : [true,"plase enter property's price"]
    },
    ratings :{
        type : Number,
        default : 0
    },
    images :[
        {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
        }
    ],
    description: {
        type: String,
        required: [true, "Please Enter property Description"],
    },
    numOfReviews : {
        type : Number,
        default : 0
    },
    reviews : [
        {   
            user: {
                type:mongoose.Schema.ObjectId,
                ref: "User",
                required:true,
            },
            name : {
                type : String,
                required : true
            },
            rating : {
                type : Number,
                required : true
            },
            comment : {
                type : String,
                required : true
            }
        }
    ],
    user: {
        type:mongoose.Schema.ObjectId,
        ref: "User",
        required:true,
    }
})

module.exports = mongoose.model("Property",propertySchema);