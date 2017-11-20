var express = require('express')
	, router = express.Router()
	, Company = require('../models/company');

router.use('/companies', require('./companies'));
//router.use('/users', require('./users'));

router.get('/', function(req, res) {
	Companies.all(function(err, companies) {
		res.render('index', {companies: companies})
	})
});

module.exports = router;