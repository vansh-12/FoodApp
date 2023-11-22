const userModel = require("../Models/userModel");
const mongoose = require('mongoose');


module.exports.getUser = async function getUser(req, res) {
    //let allUsers = await userModel.find();//finds all documents
    //let allUsers = await userModel.findOne({ name: 'vansh' });//finds one document with query or filter data

    console.log(req.role);
    let id = (req.id);//params removed as parameter senhi lena protect route se lena hai
    //if (user) {
    //    return res.json(user);
    //} else {
    //    return res.json({
    //        message: 'user not foundd'
    //        //message: 'list of all users', data: allUsers
    //    });
    //}
    try {
        let user = await userModel.findById(id);
        //let user = await userModel.findById(id);
        if (user) {
            return res.json(user);
        } else {
            return res.json({
                message: 'user not foundd'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while fetching the user' });
    }
}


//module.exports.postUsers=function postUser(req, res) {
//    console.log(req.body);
//    users = req.body;
//    res.json({
//        message: 'data received',
//        user: req.body
//    });
//}

/*module.exports.patchUser = async function patchUser(req, res) {
    //console.log('req.body', req.body);
    //update data of users obj
    let id = req.params.id;
    try {
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;
        //let user = await userModel.findOneAndUpdate({ email: 'vk@gmail.com' }, dataToBeUpdated);
        //for (key in dataToBeUpdated) {
        //    users[key] = dataToBeUpdated[key];
        //}
        if (user) {
            const keys = [];
            for (let key in dataToBeUpdated) {
                keys.push(key);
            }
            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = await user.save();//depricated-save at document level
            res.json({
                message: 'data updated suceess',
                data: updatedData
            });
        } else {
            res.json({
                message: 'data not updated as user not found'
            })
        }
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}*/
module.exports.patchUser = async function patchUser(req, res) {
    let id = req.params.id;
    let dataToBeUpdated = req.body;

    try {
        let updatedData = await userModel.findOneAndUpdate({ _id: id }, dataToBeUpdated, { new: true });

        if (!updatedData) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'User data updated successfully',
            data: updatedData
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
}
module.exports.deleteUser = async function deleteUser(req, res) {
    //users = {};
    //let dataToBeDeleted = req.body;
    //let user = await userModel.findOneAndDelete(dataToBeDeleted);
    //res.json({
    //    message: "data has been deleted",
    //    data: user
    //})
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if (!user) {
            res.json({
                message: "user not found"
            })
        }
        res.json({
            message: "data has been deleted",
            data: user
        });
    } catch (err) {
        res.json({
            message: err.message
        });
    }
}
module.exports.getAllUser = async function getAllUser(req, res) {
    //console.log(req.params.id);
    //console.log(req.params);
    //let paramId = req.params.id;
    //let obj = {}
    //for (let i = 0; i < users.length; i++) {
    //    if (users[i]['id'] == paramId) {
    //        obj = users[i];
    //    }
    //}
    //res.json({
    //    message: 'user id received',
    //    data: obj
    //});
    try {
        let user = await userModel.find();
        if (user) {
            res.json({
                message: 'user retrived',
                data: user
            });
        }
        else {
            res.json({
                message: 'user not retrived'
            });
        }
    } catch (err) {
        res.json({
            message: err.message
        })
    }

    //res.send("user id recceived");
}

//module.exports.setCookies = function setCookies(req, res) {
//    //res.setHeader('Set-Cookie','isLoggedIn=true');
//    res.cookie('isLoggedIn', true, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true });
//    res.cookie('isPrimeMember', true);
//    res.send('cookies has been set ');
//}
//module.exports.getCookies = function getCookies(req, res) {
//    let cookies = req.cookies;//access all cookies
//    //access specifc cookies let c1= req.cookies.isLoggedIn;
//    console.log(cookies);
//    res.send('cookies received');
//
//}

//export by making object and value(functions) or by each export in line

module.exports.updateProfileImage=function updateProfileImage(req,res){
    res.json({
      message:'file uploaded succesfully'
    });
  }