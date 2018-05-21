'use strict'

var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var router = express.Router();
var app = express();


var port = process.env.PORT || 3000;

// start server
app.listen(port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

console.log('Server listening at port ' + port);

// handle CORS (cross origin resource sharing)
app.use(function (req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
		res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'Content-type');
		res.setHeader('Access-Control-Allow-Credentials', true);
		next();
});

app.use(express.static(path.join(__dirname, '../web/dist')))

// routes
app.use('/users', require('./controllers/users.controller'));
app.use('/notes', require('./controllers/notes.controller'));
app.use('/folders', require('./controllers/folders.controller'));
