/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var SessionStore = require("session-mongoose")(express);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.cookieSession({
	secret: 'fens.me'
}));
app.use(express.session({
	secret: 'fens.me',
	store: new SessionStore({
		url: "mongodb://root:root@ds051838.mongolab.com:51838/cookie",
		interval: 120000
	}),
	cookie: {
		maxAge: 90000
	}
}));

app.use(function(req, res, next) {
	res.locals.user = req.session.user;
	next();
})
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.indexone);
app.get('/*',routes.indexAuth);
app.post('/',routes.indexpost);

app.get('/users', user.list);
app.get('/*', routes.zero);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

