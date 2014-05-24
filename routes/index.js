/*
 * GET home page.
 */
exports.indexone = function(req, res) {
	if (!req.session.user) {
		res.render('index', {
			title: 'Welcome',
			think: '猜猜怎么才能进入该网站'
		});
	} else {
		req.session.user = null;
		res.render('index', {
			title: 'Logout',
			think: '哎哟，又来一遍'
		})
	}
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
			res.redirect('/welcome');
		}

		res.render('index', {
			title: 'ERROR',
			think: '错了,错了,不要乱改密码或者用户啊!'
		});
	});
}
exports.indexAuth = function(req, res, next) {
	if (!res.locals.user) {
		res.render('autherr', {
			title: 'ERROR',
			think: '错了，错了，不要乱试'
		})
		return;
	}
	next();
}
exports.zero = function(req, res, next) {
	res.send('404');
}

