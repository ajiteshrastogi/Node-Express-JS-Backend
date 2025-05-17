const express = require('express');

const app = express();

app.get("/", (req, res, next) => {   // now here this time only '/' will match not the '/kuchbhi'
  console.log("Came in first middleware", req.url, req.method);
  //res.send("<p>Came from First Middleware</p>");
  next();
});
// use for exactly matching 

app.post("/submit-details", (req, res, next) => {
  console.log("Came in second middleware", req.url, req.method);
  res.send("<p>Welcome</p>");
});

//here post for exactily matching but at interface only get will wisible as it is GET req.method

app.use("/", (req, res, next) => {
  console.log("Came in another middleware", req.url, req.method);
  res.send("<p>Came from another Middleware</p>");
});


const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});