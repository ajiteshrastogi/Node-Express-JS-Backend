const path = require('path');

const express = require('express');

const userRouter = require("./routes/userRouter");
const {hostRouter} = require('./routes/hostRouter');  // using destructor
const rootDir = require("./utils/pathUtil");


const app = express();

app.set('view engine', 'ejs'); // a tempelate of ejs which is used
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded());

app.use(userRouter);
app.use("/host", hostRouter);

app.use((req, res, next)=>{
  res.sendFile(path.join(rootDir,'views', 'error.html'));
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
