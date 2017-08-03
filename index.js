//
// index.js for index in /Users/leandr_g/Documents/perso/tmp/RallyBot/
//
// Made by Gaëtan Léandre
// Login   <gaetan.leandre@epitech.eu>
//
// Started on  Tue Aug  1 01:34:33 2017 Gaëtan Léandre
// Last update Wed Aug  2 19:03:21 2017 Gaëtan Léandre
//

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8081;
var mongoose = require('mongoose');
var server = require('http').Server(app);

// Configuration
app.use(express.static(__dirname + './'));
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(function (req, res, next) {
  console.log(req.body); // populated!
  next();
});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

require('./roads/userRoad.js')(app);
require('./roads/gameRoad.js')(app);
require('./roads/chatFuel.js')(app);

server.listen(port);

console.log('The MAIN server is running on port ' + port);
