var passport = require('passport');
var User = require('./models/user');
var _ = require('lodash');

var auth=require('./controllers/auth');


module.exports = function(app) {
	app.post('/register', auth.register);

	app.post('/login', passport.authenticate('local'), auth.login);

	app.get('/logout', auth.logout);
};