if(!process.env.NODE_ENV){
	require('dotenv').load();
}

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');


// mongoose.connect(process.env.MONGOLAB_URI, function(err) {
//   if (err) {
//     console.log(process.env.MONGOLAB_URI);
//     return console.log("Error database");
//   }
//   console.log("Database Connected");
// });
//


app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
  layout: false
});


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// app.use(session({ secret: 'mysecret' })); //add for GithubStrategy

app.use(passport.initialize());
app.use(passport.session());



//on homepage load, render the index page
app.get('/', function(req, res) {
  res.render('index');
});



var server = app.listen(port, function() {
  var host = server.address().address;
  console.log('Example app listening at http://localhost:' + port);
});
