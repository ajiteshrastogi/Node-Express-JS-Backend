const path = require('path');
const express = require('express');

const { registerUsers } = require('./hostRouter');

const userRouter = express.Router(); // to make router

userRouter.get('/' , (req, res, next)=>{
    console.log(registerUsers);
    res.render('home', {registerUsers} )  // direct rendering the file to ejs not through file directory 
});

module.exports = userRouter;