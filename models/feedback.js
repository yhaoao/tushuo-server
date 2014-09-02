var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
	user:Schema.Types.ObjectId,
	content:String
});


module.exports = mongoose.model('Feedback', feedbackSchema);