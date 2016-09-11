module.exports = function(options){
    var app = options.app
        , express = options.express
        , groupRouter = express.Router();


    /**
     * Group Detail
     */
    groupRouter.get('/:id',function(req,res){
        Groups.findOne({where:{id:req.params.id}}).then(function(group){
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

    /**
     * Group Create
     */
    groupRouter.post('/',function(req,res){
        try{
            if(!req.body.name){
                throw new MissingParametersException();
            }

            Groups.findAll({ where:{ name : req.body.name }}).then(function(group){
                if(group.length > 0){
                    res.json(new ApiResponse(app.get('duplicateRecordCode'),app.get('duplicateUserRecordMsg'),null).getJson());
                }
                else{
                    var d = req.body;
                    Groups.create({
                        name: d.name
                    }).then(function(data){
                        if(data) {
                            res.json(new ApiResponse(app.get('successCode'), app.get('successMsg'),data).getJson());
                        }
                        else{
                            res.json(new ApiResponse(app.get('failCode'), app.get('failMsg'),null).getJson());
                        }
                    });
                }
            });
        }
        catch (ex){
            if(ex instanceof MissingParametersException){
                res.json(new ApiResponse(app.get('missingParamErrorCode'),app.get('missingParamErrorMsg'),null).getJson());
            }
            else {
                res.json(new ApiResponse(app.get('failCode'), app.get('failMsg'),null).getJson());
            }
        }
    });

    /**
     * Group Delete
     */
    groupRouter.delete('/:id',function(req,res){
        var tempId = req.params.id;

        User2Group.findAll({ where:{ groupId: tempId}}).then(function (data) {
            if(data!=null && data.length>0) {
                res.json(new ApiResponse(app.get('failCode'), app.get('failMsg'),null).getJson());
            }
            else{
                Groups.findOne({where:{id:tempId}}).then(function(group){
                    if(group!=null) {
                        Groups.destroy({where:{id:tempId}}).then(function(deleteData) {
                            if (deleteData != null) {
                                res.json(new ApiResponse(app.get('successCode'), app.get('successMsg'), deleteData).getJson());
                            }
                            else{

                                res.json(new ApiResponse(app.get('failCode'), app.get('failMsg'),null).getJson());
                            }
                        });
                    }
                    else{
                        res.json(new ApiResponse(app.get('noRecordErrorCode'), app.get('noRecordErrorMsg'),null).getJson());
                    }
                });
            }
        })

    });


    app.use('/api/group', groupRouter);
};
