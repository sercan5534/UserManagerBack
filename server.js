//APP
var express = require('express');
var cors = require('cors')
var app = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');

//CONFIG
require('./app.config')(app);
require('./apiResponse');
require('./app.exceptions');

app.set('port', (process.env.PORT || 5000));

app.options('/login', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.end();
});


//BODY PARSING
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//LOGGING
app.use(morgan('dev'));

//MODELS
require('./app.model.js');

//ROUTES
var params = { app:app,express:express};
require('./router/welcomeRouter.js')(params);
require('./router/groupRouter.js')(params);
require('./router/userRouter.js')(params);

//GO-GO-GO
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


