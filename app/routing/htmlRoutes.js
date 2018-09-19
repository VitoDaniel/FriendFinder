var path = require('path');
module.exports = function(app){

    app.get('/survey', function(req, res) {
		res.sendFile(path.join(__dirname, '../public/survey.html'));
	});

    // if no matching route is found set default to home
    app.use(function(req, res){
        res.sendFile(path.join(__dirname + '/../public/home.html'));
    });
}

