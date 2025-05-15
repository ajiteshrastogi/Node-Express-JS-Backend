const http = require ("http");
const fs = require('fs');

const server = http.createServer((req, res) => {

  if (req.url === '/') {

    res.setHeader('Content-Type', 'text/html');
    res.write(`
        <html>
            <head><title>Parsing Req</title></head>
            <body>
                <h1>Enter Your Details:</h1>
                <form action="/submit-details" method="POST">
                    <input type="text" name="username" placeholder="Enter your name"><br>
                    <label for="male">Male</label>
                    <input type="radio" id="male" name="gender" value="male" />
                    <label for="female">Female</label>
                    <input type="radio" id="female" name="gender" value="female" />
                    <br>
                    <input type="submit" value="Submit">
                </form>
            </body>
        </html>
    `);

    return res.end();
 
  }else if (req.url.toLowerCase() === "/submit-details" && req.method == "POST") {

        let body = [];
        req.on('data', chunk=>{
            console.log(chunk);
            body.push(chunk);
        });
        
        req.on('end', ()=>{
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);  
            const params = new URLSearchParams(parseBody);
            const bodyObject = Object.fromEntries(params);
            console.log(bodyObject);  

            // fs.writeFileSync('user.txt', JSON.stringify(bodyObject));

            // now the above code is sync
            // means it is blocking code
            // which means firstly it will execute then the code part below it will execute
            // to overcome from this we use --- 
            fs.writeFile('user.txt', JSON.stringify(bodyObject), error => {
                console.log('Data written successfully');
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            })
        });
  }else{
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Complete Coding</title></head>');
    res.write('<body><h1>Hello</h1></body>');
    res.write('</html>');
    res.end();
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});