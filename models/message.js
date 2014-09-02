var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
	fromId:Schema.Types.ObjectId,
	fromAvatar:String,
	fromUsername:String,
	toId:Schema.Types.ObjectId,
	content:String
});


module.exports = mongoose.model('Message', MessageSchema);