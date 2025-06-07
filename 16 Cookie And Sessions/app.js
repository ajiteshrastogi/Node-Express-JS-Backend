const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const DB_URL = ""
const store = new MongoDBStore({
    uri: DB_URL,
    collection: 'sessions'
}); 

const userRouter = require('./routes/userRouter');
const hostRouter  = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter');

const errorController = require('./controllers/error');
const app = express();
// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store
}));
app.use((req, res, next) => {
    req.isLoggedIn = req.session.isLoggedIn;
    next();
});
app.use(authRouter);
app.use(userRouter);
app.use('/host', (req, res, next) => {
    // For now, we'll set isLoggedIn to false by default
    // In a real application, you would check for a valid session or token here
    if(req.isLoggedIn){
        next(); 
    }else{
        res.redirect('/login');
    }
});

// as we can also redirect to the host page or its url without login
// here if remember the url and redirect to the same url without login
// then is will redirect login page
app.use('/host', hostRouter);


app.use(errorController.get404);

// Start server and connect to MongoDB
const port = 3333;

mongoose.connect(DB_URL)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(port, () => {
        console.log(`Server running on address http://localhost:${port}`);
    });
}).catch((err)=>{
    console.log("Error connecting to MongoDB", err);
})


