const http = require('http');
const fs = require('fs');
const path = require('path');
const data = require('./data/product');
const qs = require('querystring');

var server = http.createServer(function(request, response){

  console.log(`${request.method} request for ${request.url}`);

  if(request.method === "GET"){
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

    } else if (request.url.match(/.js$/)){
      var javaPath = path.join(__dirname, 'public', request.url);
      var fileStream = fs.createReadStream(javaPath, 'UTF-8');
      console.log(javaPath);
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

    } else if (request.url.match(/.jpg$/)){
      var imgPath = path.join(__dirname, 'public', request.url);
      var imageStream = fs.createReadStream(imgPath);
      console.log(imgPath);
      response.writeHead(200, {'Content-Type': 'image/jpeg'});
      imageStream.pipe(response);

    }else if (request.url === '/allProducts'){
      response.writeHead(200, {'Content-Type': 'text/json'});
      response.end(JSON.stringify(data));

    }else if (request.url === '/inStock'){
      inStock(response);

    }else if (request.url === '/outStock'){
        outStock(response);

    }
    }else if(request.method === "POST"){
      if(request.url === '/formSubmit'){
        var body = '';

        request.on('data', function(data){
          body += data;
        });

        request.on('end', function(){
          var formData = qs.parse(body);
          console.log(formData);
          // response.writeHead(302, {
          //   'Location': '/'
          // });
          // response.end();
        })

      }
    }
  });

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


server.listen(3000);

console.log("The server is running on port 3000");

function inStock(response){
  var stock = data.filter(function(item){
    return item.inStock === true;
  });
  response.end(JSON.stringify(stock));
}

function outStock(response){
  var stock = data.filter(function(item){
    return item.inStock === false;
  });
  response.end(JSON.stringify(stock));
}
