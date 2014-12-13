var _ = require('lodash');
var Message = require('../models/message');

exports.addMessage = function(req, res, next) {
	var message={};
	message.fromId=req.user._id;
	message.fromAvatar=req.user.avatar;
	message.fromUsername=req.user.username;
	message.toId=req.body.userId;
	message.content=req.body.content;


	new Message(message).save(function(err) {
		if (err) {
			return next(err);
		} else {
			return res.json({
				err: 0
			});
		}
	});
};

exports.getMessage=function(req,res,next){
	var userId=req.user._id;
	Message.find({toId:userId},function(err,messages){
		if(err){
			return next(err);
		}else{
			return res.json({
				err:0,
				data:messages
			});
		}
	});
}