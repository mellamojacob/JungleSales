#!/usr/bin/env node
var Company = require('../models/company');


Company.all(function(companies) {
	for(var company in companies) {
		var time = companies[company].time_stamp;
		var id = companies[company]._id;
		var name = companies[company].name;
		var level = companies[company].level;
		var data;
		if(time != undefined) {
			if(level == undefined) {
				level = 5;
			}
			time = time - 1;
			if(time == 1000) {
				time = 7;
			} else if(time <= 0){
				data = {tier: "graveyard", user: 0};
				time = 0;
			}
			data = {time_stamp: time};
			Company.update(name, data);
			console.log(name, " was updated");
		}
	}
});
