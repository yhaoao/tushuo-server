var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
  username:  String,
  email: String,
  gender:   String,
  createAt: { type: Date, default: Date.now }
});

userSchema.plugin(passportLocalMongoose,{
	saltlen:16,
	keylen:128,
	usernameField:'email'
});

module.exports = mongoose.model('User', userSchema);