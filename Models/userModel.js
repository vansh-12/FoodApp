const mongoose = require("mongoose");
const emailValidator= require("email-validator");
const bcrypt= require("bcrypt");
const crypto=require("crypto");
//8@NVWcmQuwM2e*i
const db_link = "mongodb+srv://admin:8%40NVWcmQuwM2e%2Ai@cluster0.yb9tb6x.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_link)
    .then(function (db) {
        console.log("user db connect");
        //console.log(db);
    })
    .catch(function (err) {
        console.log(err);
    });
//schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        validate: function () {
            return this.confirmPassword == this.password;
        }
    },
    role:{
    type:String,
    enum:['admin','user','restaurantowner',"deliveryboy"],
    default:'user'
    },
    profileImage:{
        type:String,
        default:'img/users/default.jpeg'
    },
    resetToken:String//save token for reset password/forget pass

});
//userSchema.pre('save',function(){
//    console.log('before saving in db',this);
//})
//userSchema.post('save',function(doc){
//    console.log('before saving in db',doc);
//})
userSchema.pre('save', function () {
    this.confirmPassword = undefined;
})

//ATTACH METHODS TO SCHEMA:
userSchema.methods.createResetToken=function(){
    //creating unique token using npm i crypto
    const resetToken=crypto.randomBytes(32).toString("hex");
    this.resetToken=resetToken;
    return resetToken;
}
userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
    this.password=password;
    this.confirmPassword=confirmPassword;
    this.resetToken=undefined;
}


//userSchema.pre('save', async function () {
//    let salt = await bcrypt.genSalt();
//    let hashedString=await bcrypt.hash(this.password,salt);
//    //console.log(hashedString);
//    this.password=hashedString;
//})
//models
// model created by name userModel
const userModel = mongoose.model("userModel", userSchema);
module.exports=userModel;
//create user
//
//(async function createUser(){
//    let user={
//        name:"vanshh",
//        email:"vanh@gmail.com",
//        password:"12345678",
//        confirmPassword:"12345678"
//    };
//    let data= await userModel.create(user);
//    console.log(data);
//})();
