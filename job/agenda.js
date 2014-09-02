var Agenda = require('agenda');
var Post = require('../models/post');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/tushuo');

var agenda = new Agenda({
	db: {
		address: 'localhost:27017/agenda-example'
	}
});


agenda.purge(function(err, numRemoved) {

	agenda.define('score', function(job, done) {
		Post.computeScore(function(err) {
			console.log('success');
			done();
		});
	});

	agenda.every('3600 seconds','score');

	agenda.start();

});


function graceful() {
	agenda.stop(function() {
		process.exit(0);
	});
}

process.on('SIGTERM', graceful);
process.on('SIGINT', graceful);