const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Please Enter your Name"],
        maxlength:[30,"Name can not exceed more than 30 characters"],
        minlength:[4,"Name should have atlest 4 characters"]
    },
    email: {
        type:String,
        required:[true,"Please Enter your Email"],
        unique:true,
        validate:[validator.isEmail,"Enter a valid email"]
    },
    mobileNo: {
        type:Number,
        minlength:[10,"Number should be of 10 digits."],
        maxlength:[10,"Number should be of 10 digits."],
        required:[true,"Please Enter your Mobile Number"],
        unique:true,
        
    },
    password: {
        type:String,
        required:[true,"Please Enter Password"],
        minlength:[8,"Password shold be atleast 8 charactcers"],
        select:false
    },
    avatar: {
        public_id: {
          type: String,
          required: false,
        },
        url: {
          type: String,
          required: false,
        },
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date,
});

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

//JWT Token
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRE,
    });
}

//compare passwords
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
   
} 
//Generating Reset passowrd Token
userSchema.methods.getResetPasswordToken = function (){

    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}
module.exports = mongoose.model("User",userSchema);