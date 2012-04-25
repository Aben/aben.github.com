var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

http.createServer(function(req, res) {
    res.writeHead(200, {
        'content-type': 'text/plain'
        ,"access-control-allow-origin": "*" 
        ,"access-control-allow-methods": "get,post,options,put"
        ,"access-control-allow-credentials": "true"
    });
    console.log(req);
    if (req.method.toLowerCase()== "options"){
        console.log('options');
        res.write('ok');
        res.end();
    }
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        console.log('post');
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            res.end(util.inspect({fields: fields, files: files}));
        });
        return;
    }

    // show a file upload form
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
        '<form action="/upload" enctype="multipart/form-data" method="post">'+
        '<input type="text" name="title"><br>'+
        '<input type="file" name="upload" multiple="multiple"><br>'+
        '<input type="submit" value="Upload">'+
        '</form>'
        );
}).listen(8080);
