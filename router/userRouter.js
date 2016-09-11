module.exports = function(options){
    var app = options.app
        , express = options.express
        , userRouter = express.Router();

    /**
     * User List
     */
    userRouter.get('/',function(req,res){
        Users.findAll().then(function(list){
            if(list!=null && list.length > 0) {
                res.json(new ApiResponse(app.get('successCode'), app.get('successMsg'), list).getJson());
            }
            else{
                res.json(new ApiResponse(app.get('noRecordErrorCode'), app.get('noRecordErrorMsg'),null).getJson());
            }
        });
    });

    /**
     * User Detail
     */
    userRouter.get('/:id',function(req,res){
        Users.findOne({where:{id:req.params.id}}).then(function(user){
            if(user!=null) {
                res.json(new ApiResponse(app.get('successCode'), app.get('successMsg'), user).getJson());
            }
            else{
                res.json(new ApiResponse(app.get('noRecordErrorCode'), app.get('noRecordErrorMsg'),null).getJson());
            }
        });
    });

    /**
     * User List According to Group ID
     */
    userRouter.get('/all/:id',function(req,res){
        User2Group.findAll({ where:{ groupId: req.params.id}}).then(function (data) {
            if(data!=null && data.length>0) {
                var arr = [];
                for (var i = 0 ; i< data.length; i++){
                    arr.push(data[i].userId);
                }
                Users.findAll({ where:{ id: { $in: arr }}}).then(function(user) {
                    if (user != null) {
                        res.json(new ApiResponse(app.get('successCode'), app.get('successMsg'), user).getJson());
                    }
                    else {
                        res.json(new ApiResponse(app.get('noRecordErrorCode'), app.get('noRecordErrorMsg'), null).getJson());
                    }
                });
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
        var tempId = req.params.id;
        Users.findOne({where:{id:tempId}}).then(function(user){
            if(user!=null) {
                User2Group.destroy({where:{userId:tempId}}).then(function(data) {
                    if (data != null) {
                        Users.destroy({where:{id:tempId}}).then(function(deleteData) {
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
            if(!req.body.name && !req.body.email && !req.body.groupList){
                throw new MissingParametersException();
            }

            Users.findAll({ where:{ email : req.body.email }}).then(function(user){
                if(user.length > 0){
                    res.json(new ApiResponse(app.get('duplicateRecordCode'),app.get('duplicateUserRecordMsg'),null).getJson());
                }
                else{
                    var d = req.body;
                    Users.create({
                        name: d.name,
                        email: d.email,
                        description: d.description
                    }).then(function(data){
                        if(data) {

                            User2Group.create({ userId: data.id , groupId:d.groupList}).then(function (relationData) {

                               res.json(new ApiResponse(app.get('successCode'), app.get('successRegistrationMsg'),relationData).getJson());
                            });
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
     * User Assign a group
     */
    userRouter.get('/assign/:userId/:groupId',function(req,res){
        User2Group.findOne({where:{userId:req.params.userId,groupId:req.params.groupId}}).then(function(user){
            if(user!=null) {
                res.json(new ApiResponse(app.get('duplicateRecordCode'), app.get('duplicateRecordMsg')).getJson());
            }
            else {
                User2Group.create({userId: req.params.userId, groupId: req.params.groupId}).then(function (data) {
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