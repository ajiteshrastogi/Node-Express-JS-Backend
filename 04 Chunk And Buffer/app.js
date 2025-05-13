const http = require('http');
const requestHandler = require('./user'); 

const server = http.createServer(requestHandler);  // here we were taking the reference only

const PORT = 443;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});