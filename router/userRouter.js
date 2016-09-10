module.exports = function(options){
    var app = options.app
        , express = options.express
        , userRouter = express.Router();

    /**
     * User Detail
     */
    userRouter.get('/:id',function(req,res){
        Users.findOne({where:{id:req.body.id}}).then(function(user){
            if(user!=null) {
                res.json(new ApiResponse(app.get('successCode'), app.get('successMsg'), user).getJson());
            }
            else{
                res.json(new ApiResponse(app.get('noRecordErrorCode'), app.get('noRecordErrorMsg'),null).getJson());
            }
        });
    });

    /**
     * User Delete
     */
    userRouter.delete('/:id',function(req,res){
        Users.findOne({where:{id:req.body.id}}).then(function(user){
            if(user!=null) {
                User2Group.delete({where:{userId:req.body.id}}).then(function(data) {
                    if (data != null) {
                        Users.delete({where:{id:req.body.id}}).then(function(deleteData) {
                            if (deleteData != null) {
                                res.json(new ApiResponse(app.get('successCode'), app.get('successMsg'), deleteData).getJson());
                            }
                            else{

                                res.json(new ApiResponse(app.get('failCode'), app.get('failMsg')));
                            }
                        });
                    }
                    else{

                        res.json(new ApiResponse(app.get('failCode'), app.get('failMsg')));
                    }
                });
            }
            else{
                res.json(new ApiResponse(app.get('noRecordErrorCode'), app.get('noRecordErrorMsg'),null).getJson());
            }
        });
    });

    /**
     * User Create
     */
    userRouter.post('/',function(req,res){
        try{
            if(!req.body.name && !req.body.email && !req.body.groupList && req.body.groupList.length == 0){
                throw new MissingParametersException();
            }

            Users.findAll({ where:{ email : req.body.email }}).then(function(user){
                if(user.length > 0){
                    res.json(new ApiResponse(app.get('duplicateRecordCode'),app.get('duplicateUserRecordMsg')));
                }
                else{
                    var d = req.body;
                    Users.create({
                        name: d.name,
                        email: d.email,
                        description: d.description
                    }).then(function(data){
                        if(data) {
                            var bulkdata = []
                            //todo check group id
                            for (var i = 0 ; i < req.body.groupList.length; i++){
                                bulkdata.push({ groupId:req.body.groupList, userId:data.id})
                            }
                            User2Group.bulkCreate(bulkdata).then(function () {
                               //no control in sequalize, perhaps check data count :/
                               res.json(new ApiResponse(app.get('successCode'), app.get('successRegistrationMsg')));
                            });
                        }
                        else{
                            res.json(new ApiResponse(app.get('failCode'), app.get('failMsg')));
                        }
                    });
                }
            });
        }
        catch (ex){
            if(ex instanceof MissingParametersException){
                res.json(new ApiResponse(app.get('missingParamErrorCode'),app.get('missingParamErrorMsg')));
            }
            else {
                res.json(new ApiResponse(app.get('failCode'), app.get('failMsg')));
            }
        }
    });


    /**
     * User Assign a group
     */
    userRouter.get('/assign/:userId/:groupId',function(req,res){
        User2Group.findOne({where:{userId:req.body.userId,groupId:req.body.groupId}}).then(function(user){
            if(user!=null) {
                res.json(new ApiResponse(app.get('duplicateRecordCode'), app.get('duplicateRecordMsg')).getJson());
            }
            else {
                User2Group.create({userId: req.body.userId, groupId: req.body.groupId}).then(function (data) {
                    if (data) {
                        res.json(new ApiResponse(app.get('successCode'), app.get('successRegistrationMsg')));
                    }
                    else {
                        res.json(new ApiResponse(app.get('failCode'), app.get('failMsg')));
                    }
                });
            }
        });
    });


    app.use('/api/user', userRouter);
};