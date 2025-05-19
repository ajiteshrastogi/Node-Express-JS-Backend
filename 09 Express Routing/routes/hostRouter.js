const path = require('path');
const express = require('express');
const hostRouter = express.Router(); 
const rootDir = require("../utils/pathUtil");

// TEMPORARY memory storage
let latestUserData = {
  name: '',
  email: ''
};

hostRouter.get('/submit-info', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'view', 'form.html'));
});

hostRouter.post('/submit-info', (req, res, next) => {
  const name = req.body.name;  
  const email = req.body.email;  

  // Store data temporarily
  latestUserData.name = name;
  latestUserData.email = email;

  // Redirect to /success (no query params)
  res.redirect('/host/success');
});

// Serve success.html
hostRouter.get('/success', (req, res) => {
  res.sendFile(path.join(rootDir, 'view', 'success.html'));
});

// Send stored user data to the frontend
hostRouter.get('/success-data', (req, res) => {
  res.json({
    name: latestUserData.name || "Not Provided",
    email: latestUserData.email || "Not Provided"
  });
});
// this is not safe for real applications because all users share the same memory,
// and it resets when the server restarts.
module.exports = hostRouter;
