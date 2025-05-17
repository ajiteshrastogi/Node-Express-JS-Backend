const express = require('express');

const app = express();

app.use("/", (req, res, next) => {  // yeh / mein toh chalega hi ekin agar '/kuchbhi' ho tabhi chalega matlab bas / se start hona xhaiye
  console.log("Came in first middleware", req.url, req.method);
  // res.send("<p>Came from First Middleware</p>");  // iske baad ka aage execute nahi as it send to the client 
  next();
});

app.use("/", (req, res, next) => {
  console.log("Came in another middleware", req.url, req.method);
  res.send("<p>Came from another Middleware</p>");
});

// jaise iske baad humne next nahi lagaya so 
// agar hum http://localhost:3002/submit-detail karenge to upr wala hi aayega 
// kyunki ji '/submit-detail' matches '/' first

app.use("/submit-details", (req, res, next) => {
  console.log("Came in second middleware", req.url, req.method);
  res.send("<p>Welcome to Complete Coding Nodejs series</p>");
});  

//send ke baad next nahi kr skte, send == end


/*
order matters here
can not call next() after send()
'/' matches everything
calling res.send implicitly calls res.end()
*/


const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});