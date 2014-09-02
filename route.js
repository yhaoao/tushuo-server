var passport = require('passport');
var _ = require('lodash');

var auth = require('./controllers/auth');
var user = require('./controllers/user');
var post = require('./controllers/post');
var feedback = require('./controllers/feedback');
var message = require('./controllers/message');


module.exports = function(app) {
	//权限
	app.post('/register', auth.register);
	app.post('/login', passport.authenticate('local'), auth.login);
	app.get('/logout', auth.logout);

	//用户
	app.put('/user', user.updateUser);
	app.get('/user/:id', user.getUser);

	//话题
	app.post('/post', user.user, post.addPost);
	app.post('/post/:id/comment', user.user, post.addComment);
	app.get('/post', user.user, post.getPosts);
	app.get('/post/:id', post.getPost);
	app.get('/post/:id/comment', post.getComments);
	app.put('/post/:id', post.updatePost);

	//反馈
	app.post('/feedback', user.user, feedback.addFeedback);

	//消息
	app.post('/message', user.user, message.addMessage);
	app.get('/message', user.user, message.getMessage);
};