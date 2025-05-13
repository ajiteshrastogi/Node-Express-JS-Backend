const http = require('http');
const server = http.createServer((req, res)=>{ 

    // we can give different res for different url

    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Response HTML</title></head>');
        res.write('<body><h1>Welcome to Home</h1></body>');
        res.write('</html>');
        return res.end();
      } else if (req.url === '/hello') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Response HTML 2</title></head>');
        res.write('<body><h1>Hello from page 2</h1></body>');
        res.write('</html>');
        return res.end();
      }
    
      // for any other url or default   (below)

    res.setHeader('Content-Type', 'text/html');  // here it tell we want ro write a html file 

    //from here we were writing the html code (you can also write it in onluy on string)

    res.write('<html>');
    res.write('<head><title>Response HTML</title></head>');
    res.write('<body><h1>Hello World</h1></body>');
    res.write('</html>');
    res.end();  // here after that we are not able to again use setHeader aor write 
    // beacuse response already sent to the clint so n getback from that 
    // Hence we were using the return res.end();


});

const PORT = 3001;
server.listen(PORT, function(){
    console.log(`Server running on address http://localhost:${PORT}`);
});
