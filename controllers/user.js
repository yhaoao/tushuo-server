var _ = require('lodash');
var User = require('../models/user');

exports.updateUser = function(req, res, next) {
	var hash = req.cookies['connect.id'];

	User.update({
		hash: hash
	}, req.body, function(err) {
		if (err) {
			return next(err);
		} else {
			res.json({
				err: 0
			});
		}
	});
};

exports.getUser = function(req, res, next) {
	var id = req.params.id;

	User.findOne({
		_id: id
	}, function(err, user) {
		if (err) {
			next(err);
		} else {

			res.json({
				err: 0,
				data: user.userInfo()
			});
		}
	});
};

exports.user = function(req, res, next) {
	var hash = req.cookies['connect.id'];
	User.findOne({
		hash: hash
	}, function(err, user) {
		if (err) {
			next(err);
		} else {
			if (!user) {
				res.status(401);
			} else {
				req.user = user;
				next();
			}
		}
	});
};