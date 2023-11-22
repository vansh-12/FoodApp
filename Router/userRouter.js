const express = require('express');
//const app = express();
const userRouter = express.Router();
const multer = require('multer');
//const protectRoute= require("../Router/authHelper")
const { getUser, getAllUser, getCookies, setCookies, deleteUser, patchUser, postUser,updateProfileImage } = require("../controller/userContoller");
const { signup, login, isAuthorized, protectRoute, forgetpassword, resetpassword, logout } = require('../controller/authController')
userRouter
    .route('/:id')//specific route user options
    .patch(patchUser)
    .delete(deleteUser)
userRouter.route('/signup').post(signup)
userRouter.route('/login').post(login)
userRouter.route('/forgetpassword').post(forgetpassword)
userRouter.route('/resetpassword/:token').post(resetpassword)
userRouter.route('/logout').get(logout)

//multer for fileupload

//upload-> storage, filter
const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, `user-${Date.now()}.jpeg`)
    }
});

const filter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb(new Error("Not an Image! Please upload an image"), false)
    }
}


const upload = multer({
    storage: multerStorage,
    fileFilter: filter
});


//get post request
userRouter.post("/ProfileImage", upload.single('photo'), updateProfileImage);
//get request
userRouter.get('/ProfileImage', (req, res) => {
    res.sendFile("C:\\Full Stack(MERN)\\FoodApp\\multer.html");
});

userRouter.use(protectRoute);//protect route profile page
userRouter
    .route('/userProfile')
    .get(getUser);


userRouter.use(isAuthorized(['admin']));//admin specific    
userRouter
    .route('/')
    .get(getAllUser)

//userRouter
//    .route('/')
//    .get(protectRoute,getUsers)//first proted route runs
//    .post(postUser)
//    .patch(patchUser)
//    .delete(deleteUser);
//userRouter
//    .route("/getCookies")
//    .get(getCookies);
//
//userRouter
//    .route("/setCookies")
//    .get(setCookies);
//userRouter
//    .route("/:id")
//    .get(getUserById);
//
//
//
module.exports = userRouter;