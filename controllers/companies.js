var express = require('express')
	, router = express.Router()
	, schedule = require('node-schedule')
	, Company = require('../models/company')
	, auth = require('../middlewares/auth');

router.post('/', auth, function(req, res) {
	user = req.user.id;
	name = req.body.name;

	Company.create(user, name, function (err, comment) {
		res.redirect('/');
	});
});

router.get('/:id', function(req, res) {
	Company.get(req.params.id, function(err, comment) {
		res.render('companies/company', {company: company});
	});
});

var j = schedule.scheduleJob('0 10 14 * * *', function() {
	var allComps = Company.all(function(companies) {
		for(var company in companies) {
			//console.log("The company timestamp is ", companies[company].time_stamp);
			var time = companies[company].time_stamp;
			var id = companies[company]._id;
			var name = companies[company].name;
			if(time != undefined) {
				time = time - 1;
				//console.log(time);
				//console.log(id);
				if(time == 1000) {
					time = 7;
				}
				//Company.update(name, {$set: {time_stamp: time}}, {upsert: false});
				Company.update(name);
			}
		}});
	});

module.exports = router