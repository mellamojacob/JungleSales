var stitch = require("mongodb-stitch");

var client = new stitch.StitchClient('jungle_sales-jppgh');

var db = client.service('mongodb', 'mongodb-atlas').db('junglesales');

exports.connect

exports.connect = function() {
	client.login().then(() => 
		db.collection('companies').find({})
	).then(docs => {
		console.log("Found docs", docs);
		console.log("[MongoDB Stitch] Connected to Stitch");
	}).catch(err => {
		console.log(err);
	});
}

exports.fetch = function(crit, cb) {
	client.login().then(() => 
		db.collection('companies').find(crit)
	).then(docs => {
		return cb(docs);
	}).catch(err => {
		console.log(err);
	})
}

exports.update = function(crit) {
	client.login().then(() => 
		db.collection('companies').updateOne({name: crit}, {$set: {time_stamp : 7}}, {upsert: false})
	).then(() => 
		db.collection('companies').find({name: crit})
	).then(docs => {
		console.log(docs);
	}).catch(err => {
		console.log(err);
	})
}