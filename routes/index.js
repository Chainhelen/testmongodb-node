/*
 * GET home page.
 */
exports.indexone = function(req, res) {
	req.session.user = null;
	res.render('index', {
		title: 'Welcome',
		think: '猜猜怎么才能进入该网站'
	});
};

exports.indexpost = function(req, res) {
	var User = require('../models/user');
	var user = {};
	User.findByName(req.body.username, function(err, obj) {
		if (err) {
			console.log("not find");
		}
		console.log(obj.password);
		user["username"] = req.body.username;
		user["password"] = obj.password;

		if (req.body.username == user.username && req.body.password == user.password) {
			req.session.user = user;
			res.redirect('/users');
		}

		res.render('index', {
			title: 'ERROR',
			think: '错了,错了,不要乱该密码或者用户啊!'
		});
	});
}
exports.indexAuth = function(req, res, next) {
	console.log("user;" + req.session.user);
	if(!res.locals.user){
		res.render('index',{
			title: 'ERROR',
			think: '错了，错了，不要乱试'
		})
	}
	next();
}
exports.zero = function(req, res, next){
	res.send('404');
}
