var passport = require('passport');
var User = require('../models/user');
var _ = require('lodash');

exports.register = function(req, res) {
	var username = req.body.username;
	var email = req.body.email;
	var birthday = req.body.birthday;
	var gender = req.body.gender;
	var avatar = (gender === 'male') ? 'img/male.gif' : '/img/female.gif';

	User.register(new User({
		username: username,
		email: email,
		gender: gender,
		birthday: birthday,
		avatar: avatar
	}), req.body.password, function(err, user) {
		if (err) {
			return res.json({
				err: 1,
				msg: '邮箱已存在'
			});
		}

		res.cookie('connect.id', user.hash, {
			maxAge: 90000000000,
			httpOnly: true
		});
		user = _.omit(user.toJSON(), '__v', 'salt', 'hash');

		res.json({
			err: 0,
			data: user
		});
	});
};

exports.login = function(req, res) {
	if (req.user) {
		res.cookie('connect.id', req.user.hash, {
			maxAge: 90000000000,
			httpOnly: true
		});
		var user = _.omit(req.user.toJSON(), '__v', 'salt', 'hash');

		res.json({
			err: 0,
			data: user
		});
	} else {

		res.json({
			err: '1',
			msg: '用户名或密码错误'
		});
	}
};


exports.logout = function(req, res) {
	req.logout();
	res.cookie('connect.id', '');
	res.json({
		err: 0
	});
};