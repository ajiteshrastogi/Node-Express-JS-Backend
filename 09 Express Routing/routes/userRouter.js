const path = require('path');
const express = require('express');

const rootDir = require("../utils/pathUtil");

const userRouter = express.Router(); // to make router

userRouter.get('/' , (req, res, next)=>{
    res.sendFile(path.join(rootDir,'view', 'home.html'));
});

module.exports = userRouter;