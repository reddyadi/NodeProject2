const http = require('http');
const fs = require('fs');
const path = require('path');

var server = http.createServer(function(request, response){

  console.log(`${request.method} request for ${request.url}`);
  var page;
  if(request.url === "/"){
    fs.readFile('./public/home.html', 'UTF-8', function(error, contents){
      if(error){
        console.log("error, something went wrong");
      } else {
        response.writeHead(200, {'Content-Type':'text/html'});
        response.end(contents);
      }
    });
  } else if (request.url.match(/.css$/)){
    var cssPath = path.join(__dirname, 'public', request.url);
    var fileStream = fs.createReadStream(cssPath, 'UTF-8');
    console.log(cssPath);
    response.writeHead(200, {'Content-Type': 'text/css'});
    fileStream.pipe(response);
  } else if (request.url === "/about"){
    fs.readFile('./public/about.html', 'UTF-8', function(error, contents){
      if(error){
        console.log("error, something went wrong");
      } else {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(contents);
      }
    });
  } else if (request.url === "/contact"){
    fs.readFile('./public/contact.html', 'UTF-8', function(error, contents){
      if(error){
        console.log("error, something went wrong");
      } else {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(contents);
      }
    });
  } else if (request.url === "/front"){
    fs.readFile('./public/front.html', 'UTF-8', function(error, contents){
      if(error){
        console.log("error, something went wrong");
      } else {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(contents);
      }
    });
  } else if (request.url.match(/.img$/)){
    var imgPath = path.join(__dirname, 'public', request.url);
    var fileStream = fs.createReadStream(imgPath, 'UTF-8');
    console.log(imgPath);
    response.writeHead(200, {'Content-Type': 'text/css'});
    fileStream.pipe(response);
  }
   else {
    page = "404 page not found";
  }

  // else if(request.url === "/contact"){
  //   page = "contact";
  // } else if(request.url === "/about"){
  //   page = "about";
  // } else if (request.url === "/front"){
  //   page = "front";
  // } else {
  //   page = "404 page not found";
  // }

  // response.writeHead(200, {'Content-Type': 'text/html'});
  // response.end();
});

server.listen(3000);

console.log("The server is running on port 3000");
