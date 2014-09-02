var mongoose = require('mongoose');
var _=require('lodash');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
	username: String,
	email: String,
	sign:String,
	avatar:String,
	gender: String,
	birthday: Date,
	site: String,
	loc:Schema.Types.Mixed,
	createAt: {
		type: Date,
		default: Date.now
	}
});

userSchema.plugin(passportLocalMongoose, {
	saltlen: 16,
	keylen: 64,
	usernameField: 'email'
});

userSchema.methods.userInfo=function(){
	var userInfo=_.omit(this.toJSON(), 'salt', 'hash', '__v');
	return userInfo;
};

module.exports = mongoose.model('User', userSchema);