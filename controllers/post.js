var _ = require('lodash');
var Post = require('../models/post');

exports.addPost = function(req, res, next) {
	var post = {};
	post.auth = req.user._id;
	post.desp = req.body.desp;
	post.authLoc = [req.user.loc.longitude, req.user.loc.latitude];
	post.authAvatar = req.user.avatar;
	post.authName = req.user.username;
	post.locs = {
		"type": "MultiPoint",
		"coordinates": [
			[req.user.loc.longitude, req.user.loc.latitude]
		]
	};

	console.log(post);

	new Post(post).save(function(err) {
		if (err) {
			next(err);
		} else {
			res.json({
				err: 0
			});
		}
	});
};

exports.getPosts = function(req, res, next) {
	var state = req.query.state;

	switch (state) {
		case 'latest':
			Post.getLatest(function(err, posts) {
				if (err) {
					next(err);
				} else {
					res.json({
						err: 0,
						data: posts
					});
				}
			});
			break;
		case 'hotest':
			Post.getHotest(function(err, posts) {
				if (err) {
					next(err);
				} else {
					res.json({
						err: 0,
						data: posts
					});
				}
			});
			break;
		case 'nearby':
			Post.getNearby(function(err, posts) {
				if (err) {
					next(err);
				} else {
					res.json({
						err: 0,
						data: posts
					});
				}
			});
			break;

		case 'my':
			var userId = req.user._id;
			Post.find({
				auth: userId
			}, function(err, posts) {
				if (err) {
					next(err);
				} else {
					res.json({
						err: 0,
						data: posts
					});
				}
			});
			break;
		case 'comment':
			var userId = req.user._id;
			Post.find({
				'comments.userId': userId
			}, function(err, posts) {
				if (err) {
					next(err);
				} else {
					console.log(posts);
					res.json({
						err: 0,
						data: posts
					});
				}
			});

			break;
		default:
			res.json({
				err: 1
			});

	}
};

exports.getPost = function(req, res, next) {
	var id = req.params.id;
	Post.findById(id, function(err, post) {
		if (err) {
			return next(err);
		}

		res.json({
			err: 0,
			data: post
		});
	});

};

exports.updatePost = function(req, res, next) {
	var id = req.params.id;
	if (req.body.up === 'inc') {
		Post.update({
			_id: id
		}, {
			$inc: {
				up: 1
			}
		}, function(err) {
			if (err) {
				return next(err);
			}
			return res.json({
				err: 0
			});

		});
	}

	if (req.body.down === 'inc') {
		Post.update({
			_id: id
		}, {
			$inc: {
				down: 1
			}
		}, function(err) {
			if (err) {
				next(err);
			} else {
				return res.json({
					err: 0
				});
			}
		});
	}

};

exports.addComment = function(req, res, next) {

	var postId = req.params.id;
	var comment = {};
	comment.userId = req.user._id;
	comment.userName = req.user.username;
	comment.userAvatar = req.user.avatar;
	comment.content = req.body.content;
	comment.createAt = Date.now();

	Post.update({
		_id: postId
	}, {
		$push: {
			comments: comment
		},
		$inc: {
			commentCount: 1
		}
	}, function(err) {
		if (err) {
			next(err);
		} else {
			return res.json({
				err: 0,
				data: comment
			});
		}
	});
};

exports.getComments = function(req, res, next) {
	var postId = req.params.id;
	Post.findById(postId, {
		comments: 1,
		_id: 0
	}, function(err, post) {
		if (err) {
			return next(err);
		}
		var comments = post.comments;

		comments = _.sortBy(comments, function(comment) {
			return -comment.createAt;
		});

		return res.json({
			err: 0,
			data: comments
		});
	});
}