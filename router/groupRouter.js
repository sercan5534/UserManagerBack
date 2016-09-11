module.exports = function(options){
    var app = options.app
        , express = options.express
        , groupRouter = express.Router();


    /**
     * Group Detail
     */
    groupRouter.get('/:id',function(req,res){
        Groups.findOne({where:{id:req.query.id}}).then(function(group){
            if(group!=null) {
                res.json(new ApiResponse(app.get('successCode'), app.get('successMsg'), group).getJson());
            }
            else{
                res.json(new ApiResponse(app.get('noRecordErrorCode'), app.get('noRecordErrorMsg'),null).getJson());
            }
        });
    });

    /**
     * Group List
     */
    groupRouter.get('/',function(req,res){
        Groups.findAll().then(function(group){
            if(group!=null) {
                res.json(new ApiResponse(app.get('successCode'), app.get('successMsg'), group).getJson());
            }
            else{
                res.json(new ApiResponse(app.get('noRecordErrorCode'), app.get('noRecordErrorMsg'),null).getJson());
            }
        });
    });




    app.use('/api/group', groupRouter);
};
