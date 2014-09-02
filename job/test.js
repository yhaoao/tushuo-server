var Post = require('../models/post');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/tushuo');

Post.computeScore(function(err) {
	console.log(err);
	console.log('success');
});