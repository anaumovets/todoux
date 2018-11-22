'use strict';
require('dotenv').load();
let express = require('express');
let fs = require('fs');
let http = require('http');
let https = require('https');
let controller = require('./controller')('mongodb://localhost:27017/todoux');
var request = require('request');
var bodyParser = require('body-parser');
var compression = require('compression');

let app = express();

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json()); // for parsing application/json

let router = express.Router();
router.route('/items')
      .get((req, res)=>controller.getItems(req, res))
      .post((req, res)=>controller.postItems(req, res))
      .delete((req, res)=>controller.deleteItems(req, res));
app.use('/', router);

//https.createServer(options, app).listen({port: 4017});
http.createServer(app).listen({port: 4017});

console.log('listening on port '+4017);

// setTimeout(()=>{
//     request['post']('http://localhost:4017/items', {
//         form:{
//             items:[{_id:"1", text:"abc posted from post", date:1233445}]
//         }
//     });
// }, 1000);


