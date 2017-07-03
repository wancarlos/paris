var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var session = require('express-session');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var mongorelation = require('mongo-relation');
var formidable = require('formidable');
var fs = require('fs');
var compression = require('compression');
// Get the module

// Init App
var app = express();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:3001/newdb2');
var db = mongoose.connection;

var routes = require('./routes/index');

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout:'layout',
  partialsDir: __dirname + '/views/utils/',
  extname: '.hbs',
    helpers: {
      last: function(array){return array[array.length -1].msg;},
      subject: function(str){if (str.length > 50) return str.substring(0,50) + '...'; return str; }
    }
  })
);

app.set('view engine', '.hbs');

// compress responses
app.use(compression());
var oneYear = 1 * 365 * 24 * 60 * 60 * 1000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.timeout = 1000;

// Set Static Folder
app.use(express.static(path.join(__dirname, '/public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use('/', routes);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
