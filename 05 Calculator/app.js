const http = require ('http');
const calc = require('./calculator');

const server = http.createServer(calc);
const PORT = 1234;
server.listen(PORT, ()=>{
    console.log("Running to server 1234 ..........");
    
})

