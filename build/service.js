'use strict';

const path = require('path');
const httpProxy = require('http-proxy');
const express = require('express');
const { PROXY_HOST, PROXY_PORT, PORT, NODE_ENV} = process.env;

let proxyTarget = `http://${PROXY_HOST}:${PROXY_PORT}`;

// initialize the server and configure support for ejs templates
let app = express();

// define the folder that will be used for static assets
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './ssl')));

const proxy = httpProxy.createProxyServer({
  target: proxyTarget
});
app.use('/api', (req, res) => {
  req.url = req.baseUrl + req.url;
  return proxy.web(req, res, { target: proxyTarget })
});

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './public/index.html'));
});

// start the server
const port = PORT || 8084;
const env = NODE_ENV || 'production';

console.log(port);

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});