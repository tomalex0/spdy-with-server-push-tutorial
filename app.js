var fs = require('fs');
var spdy = require('spdy');

var backbone = fs.readFileSync('backbone.js');
var underscore = fs.readFileSync('underscore.js');
var applicationjs = fs.readFileSync('application.js');

var options = {
    key: fs.readFileSync('keys/server.key'),
    cert: fs.readFileSync('keys/server.crt'),
    ca: fs.readFileSync('keys/server.csr')
};

var server = spdy.createServer(options, function(request, response) {
    var headers = {
        'content-type': 'application/javascript'
    }

    if(response && response.push) {
        response.push('/backbone.js', headers, function (err, stream) {
            if (err) return;

            stream.end(backbone);
        });
        response.push('/underscore.js', headers, function (err, stream) {
            if (err) return;

            stream.end(underscore);
        });
        response.push('/application.js', headers, function (err, stream) {
            if (err) return;

            stream.end(applicationjs);
        });
    }

    response.writeHead(200, {'content-type': 'text/html'});
    var message = "No SPDY for you!"
    if (request.isSpdy){
        message = "YAY! SPDY Works!"
    }
    response.end(`
    <html> 
      <head>
        <title>First SPDY App!</title>
        <script src='/underscore.js'></script>
        <script src='/backbone.js'></script>
        <script src='/application.js'></script>
      <head>
      <body>
        <h1>${message}</h1>
      </body>
    <html>`);
});

server.listen(3031, function(){
    console.log("SPDY Server started on 3031");
});