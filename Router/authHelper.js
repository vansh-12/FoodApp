/*const jwt= require("jsonwebtoken");
const JWT_KEY=require("C:\\Full Stack(MERN)\\secret.js");

//middleware protectroute
//let flag = false;//let user logged in
function protectRoute(req,res,next){
    if(req.cookies.login){
        console.log(req.cookies);//3parts header.payload.signature
        let isVerified= jwt.verify(req.cookies.login,JWT_KEY);
        if(isVerified){
        next();
        }else{
            return res.json({
                message: 'user not vverified'
            });
        }
    }else{
        return res.json({
            message: 'please login/not allowed'
        });
    }
}
module.exports=protectRoute;*/