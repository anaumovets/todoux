'use strict';
require('dotenv').load();
let express = require('express');
let fs = require('fs');
let http = require('http');
let https = require('https');
let controller = require('./controller');

let app = express();

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

let router = express.Router();
router.route('/items')
      .get(controller.getItems.bind(controller));
app.use('/', router);

//https.createServer(options, app).listen({port: 4017});
http.createServer(app).listen({port: 4017});

console.log('listening on port '+4017);


