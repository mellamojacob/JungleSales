var db = require('../db');

//Create new Company in your database and return its id
exports.create = function(user, name, phone_number, cb) {
	var company = {
		user: user,
		name: name,
		phone_number: phone_number
	};

	db.save(company, cb);
}

//Get a company
exports.get = function(id, cb) {
	db.fetch({id: id}, function(err, docs) {
	if (err) return cb(err);
	cb(null, docs[0]);
	})
}

// Get all companies 
exports.all = function(cb) {
	var companies = db.fetch({}, function(docs) {
		return cb(docs);
	});

}

// Get all companies associated with one user
exports.allByUser = function(user, cb) {
	db.fetch({user: user}, cb);
}

exports.update = function(crit) {
	db.update(crit);
}