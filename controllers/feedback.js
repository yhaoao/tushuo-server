var _ = require('lodash');
var Feedback = require('../models/feedback');

exports.addFeedback = function(req, res, next) {
	var userId = req.user._id;
	var content = req.body.content;

	new Feedback({
		user: userId,
		content: content
	}).save(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json({
				err: 0
			});
		}
	});

};