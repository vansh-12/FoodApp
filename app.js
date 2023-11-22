const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors()) ;
app.use(express.static('public/build'));

//const authRouter= require("./Router/authRouter.js");
//const cookieparser = require('cookie-parser');
//const planModel=require('./Models/planModel');
const cookieparser = require('cookie-parser');
app.listen(3000);


//req.body is the obj we are getting data from json format from postman to process crud oprations.
//middleware function->POST
//convert frontend data to json
app.use(express.json());// This line is a middleware function that parses incoming requests with JSON payloads. It's a built-in middleware function in Express
const port=process.env.PORT || 5000;
app.listen(port,function(){
    console.log(`server listening on port ${port}`); 
});
//let users = [
//    {id:1,
//    name:'vansh'},
//    {id:2,name:"vkkk"},
//    {id:3,name:"vkvkvkvk"}
//]
app.use(cookieparser());
// //query
// app.get('/user', (req, res) => {
//     console.log(req.query);
//     res.send(users);
// })

/*
//res.send() == res.json for receiving json file 
//GET (get data)
app.get('/user', (req, res) => {
    res.send(users);
})
//POST (send data)
app.post('/user', (req, res) => {
    console.log(req.body);
    users = req.body;
    res.json({
        message: 'data received',
        user: req.body
    });
})
//PATCH (update)
app.patch('/user', (req, res) => {
    console.log('req.body', req.body);
    //update data of users
    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated) {
        users[key] = dataToBeUpdated[key];
    }
    res.json({
        message: 'data updated'
    })
})

//DELETE
app.delete('/user', (req, res) => {
    users = {};
    res.json({
        message: "data has been deleted"
    })
})

//params
app.get("/user/:username", (req, res) => {
    console.log(req.params.username);
    console.log(req.params);
    res.send('user id received');
})
*/

//mini app
const userRouter = require("./Router/userRouter.js");
const planRouter = require("./Router/planRouter.js");
const reviewRouter = require('./Router/reviewRouter');
const bookingRouter = require("./Router/bookingRouter.js")
//MOUNTING
//const userRouter = express.Router();
//const authRouter = express.Router();
//global middleware
//baseroute
app.use('/user', userRouter);
app.use("/plans", planRouter);
app.use("/review", reviewRouter);
app.use('/booking',bookingRouter);
//mount
//app.use('/auth', authRouter)

//path spcefic middleware

//userRouter.route("/:id").get(getUserById); to work with cookies

//auth route






//function getUser(req, res) {
//res.send(users);
//}

//now getting user data from backend





//model added to models folder