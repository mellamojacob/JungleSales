var express = require('express')
	, app = express();

var db = require('./db');

app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(require('./middlewares/users'));
app.use(require('./controllers'));

var port = process.env.PORT || 3000;

db.connect(function(err) {
	if (err) {
		console.log("Unable to connect to Mongo.");
		process.exit(1);
	}
});

app.listen(port, function() {
	console.log("Listening on port ", port);
});