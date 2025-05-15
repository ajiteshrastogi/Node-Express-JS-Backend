const fs = require('fs');
const path = require('path');

const sumRequestHandler = (req, res) => {
    console.log("In Sum Request Handler", req.url);
    let body = [];

    req.on('data',chunk=>{
        console.log(chunk);
        body.push(chunk);
    })
    req.on('end', ()=>{
        const parseBody = Buffer.concat(body).toString();
        console.log(parseBody);
        const params = new URLSearchParams(parseBody);
        const bodyObject = Object.fromEntries(params);
        console.log(bodyObject);  

        const num1 = parseFloat(bodyObject.first);
        const num2 = parseFloat(bodyObject.second);
        console.log(num1);
        console.log(num2);

        if (isNaN(num1) || isNaN(num2)) {
            res.setHeader('Content-Type', 'text/html');
            res.write(`<html><body><h2>Error: Please enter valid numbers.</h2></body></html>`);
            return res.end();
        }

        const sum = num1 + num2;
        console.log(`First: ${num1}, Second: ${num2}, Sum: ${sum}`);

        const filePath = path.join(__dirname, 'hello.txt');
        fs.appendFileSync(filePath, `Sum: ${num1} + ${num2} = ${sum}\n`);
        // here append will write all data it does'nt overwrite it 
        res.statusCode = 302;


        res.setHeader("Content-Type", "text/html");
        res.write(`
            <html>
                <head><title>Result</title></head>
                <body>
                    <h2>The sum of ${num1} and ${num2} is ${sum}</h2>
                    <p><a href="/sum">Go Back</a></p>
                </body>
            </html>
        `);
        return res.end();
    });

    //res.setHeader()
    //res.write()
    //resend()

    // why these all not here beacuse of async code 
    // req.on() is async code and will take some to go to webApi to queue to event loop then to call satck to execute  
    // hence the code here will execute first so insteae writing here we write under function that
    // first to calculate it take some time and then write code as after sum is executed
};

exports.sumRequestHandler = sumRequestHandler;