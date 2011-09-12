
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration hellow server

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('view options', {
    layout: false
  });
  app.use(express.cookieParser());
  app.use(express.session({ secret: "dfh5665rfh", cookie: { maxAge: 160000 } }));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


// Routes
app.get('/', function (req, res){
  res.redirect('/stag');
});

app.get('/stag', function(req, res){

  if (req.session.authed === 'allowed') {
    res.render('index');
  } else {
    res.render('login', {
      fail: req.flash('fail')
    });
  }
});

app.post('/login', function(req, res){
  if (req.param('password') === 'roadrunner') {
    req.session.authed = 'allowed';
  } else {
    req.flash('fail', 'Incorrect password, email e@edvanbeinum.com if you really think you should be let in');    
  }
  res.redirect('/stag');
});

app.listen(8080);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
