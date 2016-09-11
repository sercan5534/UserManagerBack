module.exports = function(options){
    var app = options.app
        , express = options.express
        , welcomeRouter = express.Router();

    /**
     * Group List
     */
    welcomeRouter.get('/',function(req,res){
        res.json(new ApiResponse(100, 'Welcome', null).getJson());
    });




    app.use('/api', welcomeRouter);
};
