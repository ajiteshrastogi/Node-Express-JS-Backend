const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const userRouter = require('./routes/userRouter');
const hostRouter  = require('./routes/hostRouter');
const errorController = require('./controllers/error');
const mongoose = require('mongoose');
// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Use routers
app.use(userRouter);
app.use('/host', hostRouter);
app.use(errorController.get404);

// Start server and connect to MongoDB
const port = 3333;
const DB_URL = ""

mongoose.connect(DB_URL)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log(`Server running on address http://localhost:${port}`);
    });
}).catch((err)=>{
    console.log("Error connecting to MongoDB", err);
})
