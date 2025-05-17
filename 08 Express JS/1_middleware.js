const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log("Came in first middleware", req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log("Came in second middleware", req.url, req.method);
  res.send("<p>Welcome Home</p>");
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});