var _ = require('lodash');
var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;
var async = require('async');

var postSchema = new Schema({
	desp: String,
	auth: Schema.Types.ObjectId,
	authAvatar: String,
	authName: String,
	authLoc: [],
	score: {
		type: Number,
		default: 0
	},
	up: {
		type: Number,
		default: 0
	},
	down: {
		type: Number,
		default: 0
	},
	commentCount: {
		type: Number,
		default: 0
	},
	comments: [Schema.Types.Mixed],
	createAt: {
		type: Date,
		default: Date.now
	},
	locs: Schema.Types.Mixed
});

// postSchema.index({
// 	'locs': '2dsphere'
// });


postSchema.statics.getLatest = function(callback) {
	this.find({}, {
		comments: 0
	}, {
		limit: 30
	}, function(err, posts) {
		if (err) {
			callback(err);
		} else {
			var posts = _.sortBy(posts, function(post) {
				return -post.createAt.valueOf();
			});
			callback(null, posts);
		}
	});
};

postSchema.statics.getHotest = function(callback) {
	this.find({}, {
		comments: 0
	})
		.limit(30)
		.sort('-score')
		.exec(function(err, posts) {
			if (err) {
				callback(err);
			} else {
				callback(null, posts);
			}
		});
};

postSchema.statics.getNearby = function(callback) {
	this.find({}, {
		comments: 0
	}, {
		limit: 30
	}, function(err, posts) {
		if (err) {
			callback(err);
		} else {
			var posts = _.sortBy(posts, function(post) {
				return -post.createAt.valueOf();
			});
			callback(null, posts);
		}
	});
};

postSchema.statics.computeScore = function(callback) {
	this.find({}, {
		comments: 0
	}, function(err, posts) {
		if (err) {
			callback(err);
		} else {
			var now = moment();

			async.each(posts, function(post, callback) {
				var creatdAt = moment(post.createAt);
				var t = now.diff(creatdAt, 'hours')
				post.score = (post.up + post.down + post.commentCount) / Math.pow((t + 2), 1.8);

				post.save(callback);
			}, function(err) {
				callback(err);
			});
		}
	});
};


module.exports = mongoose.model('Post', postSchema);