const express = require('express');
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.get('/' , (req, res, next)=>{
    console.log("the / GET is accessed" , req.url, req.method);
    res.send(`<h1>Welcome to the Home page </h1>`); // here send ke baad execute hoga as it get cllback method
});

app.get('/contact-us' , (req, res, next)=>{
  console.log("the /contact-us GET is accessed", req.url, req.method);
  res.send(`
    <h1>Give your detail</h1>
    <form action='/contact-us' method='POST'>
        <label> Name : </label>
        <input type="text" name="name" placeholder="Enter your name"/><br>
        <label> Email : </label>
        <input type="email" name="email" placeholder="Enter your email"/><br><br>
        <input type="submit"/>
    </form>
  `);
});

app.post('/contact-us', (req, res, next) => {
  const name = req.body.name;  // Extracting name from the form data
  const email = req.body.email; // Extracting email from the form data

  console.log("User submitted:", { name, email });

  res.send(`
      <h1>Thanks for submitting!</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><a href="/contact-us">Go Back</a></p>
  `);
});


// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded());

// app.post("/contact-us", (req, res, next) => {
//   console.log("Handling /contact-us for POST", req.url, req.method, req.body);
// })

// Also a method to do the same thing

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
