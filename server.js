//APP
var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');

//CONFIG
require('./app.config')(app);
require('./apiResponse');
require('./app.exceptions');

app.set('port', (process.env.PORT || 5000));

//BODY PARSING
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    //res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
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


