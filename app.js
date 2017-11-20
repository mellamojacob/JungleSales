var express = require('express')
	, app = express();

var db = require('./db');

app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(require('./middlewares/users'));
app.use(require('./controllers'));

db.connect(function(err) {
	if (err) {
		console.log("Unable to connect to Mongo.");
		process.exit(1);
	} else {
		app.listen(process.env.PORT || 5000);
	}
});