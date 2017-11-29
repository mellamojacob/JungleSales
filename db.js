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

exports.update = function(crit, data) {
	client.login().then(() => 
		db.collection('companies').updateOne({name: crit}, {$set: data}, {upsert: false})
	).then(docs => {
		console.log("Finished updating documents");
	}).catch(err => {
		console.log(err);
	})
}

exports.upsert = function(crit, data) {
	client.login().then(() => 
		db.collection('companies').updateOne({name: crit}, {$set: data}, {upsert: true})
	).then(docs => {
		console.log("Finished upserting documents");
	}).catch(err => {
		console.log(err);
	})
}