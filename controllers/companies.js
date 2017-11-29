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

var j = schedule.scheduleJob('0 18 13 * * *', function() {
	var allComps = Company.all(function(companies) {
		for(var company in companies) {
			var time = companies[company].time_stamp;
			var id = companies[company]._id;
			var name = companies[company].name;
			var data;
			if(time != undefined) {
				time = time - 1;
				if(time == 1000) {
					data = {time_stamp: 7};
				}
				else if(time == 0) {
					data = {user: 0};
				}
				else {
					data = {time_stamp: time}
				}
				Company.update(name, data);
				console.log(name, "Complete", time);
			} else {
				Company.upsert(name, {time_stamp: 7});
			}
		}});
	});

module.exports = router