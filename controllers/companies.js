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



module.exports = router