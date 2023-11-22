/*const express = require('express');
const authRouter = express.Router();
const userModel = require("../Models/userModel");
const jwt= require("jsonwebtoken");
const JWT_KEY=require("C:\\Full Stack(MERN)\\secret.js");
authRouter
    .route('/signup')
    .get(middleware1, getSignup, middleware2)
    .post(postSignup);

authRouter
    .route('/login')
    .post(loginUser);

function middleware1(req, res, next) {
    console.log('middleware1 done');
    next();
}
function middleware2(req, res) {
    console.log('middleware2 ended cyle of req/res');
    //next();
    res.sendFile("\\Public\\index.html", { root: __dirname })
}
function getSignup(req, res, next) {
    console.log("usersignup done");
    next();
    //sending frontend file
    //res.sendFile("\\Public\\index.html",{root:__dirname})

}

//now getting data from frontend to backend from user i.e signup 
async function postSignup(req, res) {
    let obj = req.body;
    let user = await userModel.create(obj);
    //console.log("backend", user);

    res.json({
        message: "user signed up",
        data: user
    });
}
async function loginUser(req, res) {
    try {
        let data = req.body;
        if (data.email) {

            let user = await userModel.findOne({ email: data.email });
            if (user) {
                //bcrypt ->compare function hashed == string
                if (user.password == data.password) {
                    let uid= user['_id'];//uid of user
                    let token = jwt.sign({payload:uid},JWT_KEY);//3rd default value of algo //making signature
                    res.cookie('login',token,{httpOnly:true});//uer logged
                    return res.json({
                        message: 'user logged in',
                        userDetails: data
                    });
                } else {
                    return res.json({
                        message: 'wrong credentials'
                    })
                }
            } else {
                return res.json({
                    message: 'user not found'
                })
            }
        }else{
            return res.json({
                message: 'user not found email empty field'
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}
module.exports = authRouter;        */