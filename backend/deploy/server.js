const MarkdownRender=require('./render.js');
const express = require('express');
const app = express();
const port = 3001;
const msg=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <title>Yaposi backend</title>
</head>
<style>
    body {
        height: 96vh;
        width: 96vw;
    }
    .github {
        display: flex;
        justify-content: space-around;
    }
</style>
<body>
    <div class="github">
        <a href="https://github.com/johnbalvin/yaposi">
            <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
            </svg>
        </a>
    </div>
    <p>
        Make a post request at http://localhost:3001, the body most be a json of this format:
        "markdown":[mymarkdown] where [mymarkdown] must be your markdown,If something went wrong you will recieve and 400 status,
        Otherwise you will get 200 status with body containing the rendered markdown
    </p>
</body>
`;
const markdownRender= new MarkdownRender.MarkdownRender("katex");
markdownRender.start();
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.get('/', (req, resp) => {
    resp.setHeader('Content-Type', 'text/html');
    resp.end(msg);
});
app.post('/', (req, resp) => {
    const dataUser=req.body;
    if (!("markdown" in dataUser)){
        resp.status(400);
        resp.end("You must provide markdown");
        return
    }
    let html = "";
    try{
        html =  markdownRender.getHTML(dataUser.markdown);
    }
    catch(error){
        resp.status(400);
        resp.end(error.message);
        return
    }
    resp.setHeader('Content-Type', 'text/plain');
    resp.end(html);
})

console.log("Server started");
app.listen(port);