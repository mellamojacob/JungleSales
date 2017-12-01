#!/usr/bin/env node
var Company = require('../models/company'),


Company.all(function(companies) {
	for(var company in companies) {
		var time = companies[company].time_stamp;
		var id = companies[company]._id;
		var name = companies[company].name;
		var data;
		if(time != undefined) {
			time = time - 1;
			if(time == 1000) {
				time = 7;
			}
			data = {time_stamp: time};
			Company.update(name, data);
			console.log(name, " was updated");
		}
	}
});
