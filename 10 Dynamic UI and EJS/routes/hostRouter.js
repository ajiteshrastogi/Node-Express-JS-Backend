const path = require('path');
const express = require('express');
const hostRouter = express.Router(); 
const rootDir = require("../utils/pathUtil");

hostRouter.get('/submit-info', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'form.html'));
});

let registerUsers = []; // store the all username 
hostRouter.post('/submit-info', (req, res, next) => {
  console.log("User submitted:", req.body);
  registerUsers.push(req.body); // here we were pushing in the array
  res.sendFile(path.join(rootDir, 'views', 'success.html'));
});

exports.hostRouter = hostRouter;
exports.registerUsers = registerUsers;