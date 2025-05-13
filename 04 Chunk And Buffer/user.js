/*
STREAM
A stream in Node.js is a continuous flow of data that can be read or 
written incrementally instead of loading everything into memory at once.
 Streams improve performance by handling data in smaller parts rather than as a whole.

CHUNKS
A chunk is a small piece of data processed by a stream. 
Instead of processing an entire file or dataset at once, 
Node.js reads or writes data in chunks, making operations more memory-efficient.

BUFFER
A buffer is a temporary storage area in memory that holds binary data before processing. 
It helps in handling chunks of data efficiently in streams.
*/

const fs = require('fs');

const userRequestHandler = (req, res) => {

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

        //READING CHUNKS

        req.on('data', chunk=>{
            console.log(chunk);
            body.push(chunk);
        });
        // OUTPUT
        // <Buffer 75 73 65 72 6e 61 6d 65 3d 61 6a 69 74 65 73 68 5f 5f 72 61 73 74 6f 67 69 26 67 65 6e 64 65 72 3d 6d 61 6c 65>
        
        
        req.on('end', ()=>{

            //BUFFERING CHUNKS
            
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);  // username=name&gender=male   (as in value of form)

            // PARSING REQUEST

            const params = new URLSearchParams(parseBody);
            // const bodyObject = {};
            // for (const [key, val] of params.entries()) {
            //   bodyObject[key] = val;
            // }

            const bodyObject = Object.fromEntries(params);
            console.log(bodyObject);  // { username: 'name', gender: 'male' }

            fs.writeFileSync('user.txt', JSON.stringify(bodyObject));
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');

  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Complete Coding</title></head>');
  res.write('<body><h1>Hello</h1></body>');
  res.write('</html>');
  res.end();
};

module.exports = userRequestHandler;