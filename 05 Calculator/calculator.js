const {sumRequestHandler} = require('./sum');

const calc = (req, res)=>{
    if(req.url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <html>
                <head>
                    <title>Claculator</title>
                </head>
                <body>
                    <h1> Welcome to Home Page</h1>
                    <p><a href="/sum">Click here to calculate</a></p>
                </body>
            </html>
            `);
        return res.end();
    }else if(req.url === '/sum'){
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <html>
                <head>
                    <title>Sum</title>
                </head>
                <body>
                    <form action="/calculate-result" method="POST">
                        <label for="first">First Number : </label>
                        <input id='first' type='text'name='first' palceholder='Type you first number'/> <br>
                        <label for="second">Second Number : </label>
                        <input id='second' type='text'name='second' palceholder='Type you second number'/><br>
                        <input type="submit" value="Submit">
                    </form>
                </body>
            </html>
            `);
        return res.end();
    }else if(req.url.toLowerCase() === "/calculate-result" && req.method=='POST'){
        return sumRequestHandler(req, res);
    } else{
        res.setHeader('Content-Type', 'text/html');
            res.write(`
                <html>
                    <head>
                        <title>Claculator</title>
                    </head>
                    <body>
                        <h1> 404 Page not Exist</h1>
                        <p><a href="/">Go to Home</a></p>
                    </body>
                </html>
                `);
            return res.end();
    }
}
module.exports = calc;

