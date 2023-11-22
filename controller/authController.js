const express = require('express');
const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const {sendMail} = require('../utility/nodemailer');
const { JWT_KEY } = require("../secret");
//signuo user
module.exports.signup = async function signup(req, res) {
    try {
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        sendMail("signup",user);
        if (user) {
            res.json({
                message: "user signed up",
                data: user
            });
        } else {
            res.json({
                message: "error while signed up"
            });
        }
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}
//login user
module.exports.login = async function login(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                //bcrypt ->compare function hashed == string
                if (user.password == data.password) {
                    let uid = user['_id'];//uid of user
                    let token = jwt.sign({ payload: uid }, JWT_KEY);//3rd default value of algo //making signature
                    res.cookie('login', token, { httpOnly: true });//uer logged
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
        } else {
            return res.json({
                message: 'user not found email empty field'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}
//protectroute
module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        let token;
        if (req.cookies.login) {
            console.log(req.cookies);//3parts header.payload.signature
            //let isVerified= jwt.verify(req.cookies.login,JWT_KEY);
            //if(isVerified){
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_KEY);
            //next();
            if (payload) {
                console.log('payload token', payload);
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                console.log(req.role, req.id);
                next();

            }
            else {
                return res.json({
                    message: 'please login again'
                })
            }
        }
        else {
            //broweser message response/request 'Mozilla' means browser
            const client = req.get('User-Agent');
            if (client.includes("Mozilla") == true) {
                return res.redirect('/login');
            } else {
                res.json({
                    message: "please login"//or redirect to login page res.redirect('/login')
                })
            }
        }
    } catch (err) {
        res.json({
            message: err.message
        });
    }
}
//authorise check user roles
module.exports.isAuthorized = function isAuthorized(roles) {
    return function (req, res, next) {
        if (roles.includes(req.role) == true) {
            next();
        } else {
            res.status(401).json({
                message: 'operation not allowed'
            })
        }
    }
}
//forget password
module.exports.forgetpassword = async function forgetpassword(req, res) {
    let { email } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (user) {
            //createResetToken is used to create new token
            const resetToken = user.createResetToken();
            //http://abc.com/resetpassword/resetToken
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
            //send email to the user
            //nodemailer
            let obj ={
                resetPasswordLink:resetPasswordLink,
                email:email
            }
            sendMail("resetpassword",obj);
            return res.json({
                mesage: "reset password link sent",
                data:resetPasswordLink
              });
        }
        else {
            return res.json({
                message: "please signup"
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}
//resetpassword
module.exports.resetpassword = async function resetpassword(req, res) {
    try {
        const token = req.params.token;

        let { password, confirmPassword } = req.boby;
        const user = await userModel.findOne({ resetToken: token });
        if (user) {
            //resetPasswordHandler will update user in db
            user.resetPasswordHandler(password, confirmPassword) = await user.save();
            res.json({
                message: "password changed suceessfully login again"
            })
        } else {
            res.json({
                message: "user not found"
            })
        }
    } catch (err) {
        res.json({
            message: err.message
        });
    }
}
//logout
module.exports.logout = async function logout(req, res) {
    //search jwt token and destroy after 1 milisecond
    res.cookie('login', ' ', { maxAge: 1 });
    res.json({
        message: "user logged out succesfully"
    })
}