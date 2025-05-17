const http = require('http');
const server = http.createServer((req, res)=>{
    console.log(req.url , req.method);
});

const PORT = 3001;
server.listen(PORT, function(){
    console.log(`Server running on address http://localhost:${PORT}`);
});
