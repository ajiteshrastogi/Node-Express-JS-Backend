const http = require('http');
const server = http.createServer((req, res)=>{
    console.log(req.url , req.method, req.headers);
});

const PORT = 3001;
server.listen(PORT, function(){
    console.log(`Server running on address http://localhost:${PORT}`);
});

// now as we write the link  http://localhost:3001 servrer will listen and run nodejs

// now in the req.url we get a '/' beacuse of the default value 
// as if we write the url  http://localhost:3001/hello in the browser then req.url give '/hello' 

// req.method will give the 'GET' as we were requesting  

// req.header will will get many things like host: conection ......