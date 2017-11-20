var db = require('../db')
	, crypto = require('crypto');
	

hash = function(password) {
	return crypto.createHash('sha1').update(password).digest('base64');
}

//Create new user
exports.create = function(name, email, password, cb) {
	var user = {
		name: name,
		email: email,
		password: hash(password)
	}

	db.save(user, cb);
}

//Get a specific user
exports.get = function(id, cb) {
	db.fetch({id: id}, function(err, docs) {
	if (err) return cb(err);
	cb(null, docs[0]);
	});
}

//Authenticate a user
exports.authenticate = function(email, password) {
	db.fetch({email:email}, function(err, docs) {
		if (err) return cb(err);
		if(docs.length === 0) return cb();

		user = docs[0];

		if(user.password === hash(password)) {
			cb(null, docs[0]);
		} else {
			cb();
		}
	});
}


//Change a User's password 
exports.changePassword = function(id, password, cb) {
	db.update({id:id}, {password: hash(password)}, function(err, affected) {
		if(err) return cb(err);
		cb(null, affected > 0);
	});
}