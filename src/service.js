'use strict';

const path = require('path');
const httpProxy = require('http-proxy');
const express = require('express');

// initialize the server and configure support for ejs templates
let app = express();

// define the folder that will be used for static assets
app.use(express.static(path.join(__dirname, './public')));

const proxy = httpProxy.createProxyServer({
  target: 'http://localhost:8082'
});
app.use('/api', (req, res) => {
  req.url = req.baseUrl + req.url;
  return proxy.web(req, res, { target: 'http://localhost:8082' })
});

app.get('/', function (request, response) {
  response.sendFile(path.resolve(__dirname, './index.html'));
});

// start the server
const port = process.env.PORT || 8084;
const env = process.env.NODE_ENV || 'production';

console.log(port);

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});