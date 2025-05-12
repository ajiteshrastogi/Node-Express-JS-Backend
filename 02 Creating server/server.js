const http = require('http');
const server = http.createServer((req, res)=>{
    console.log(req); // you will multiple info
    process.exit(); // to stop the event loop
    // after that server will stop 
});

const PORT = 3001;
server.listen(PORT, function(){
    console.log(`Server running on address http://localhost:${PORT}`);
});
