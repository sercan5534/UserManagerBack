module.exports =function(app) {
    app.set('failMsg','An error occured.');
    app.set('failCode',105);
    app.set('successMsg','Success');
    app.set('successRegistrationMsg','Success');
    app.set('successCode',100);
    app.set('noRecordErrorMsg','No record found');
    app.set('noRecordErrorCode',104);
    app.set('forbiddenErrorMsg','Unauthorized');
    app.set('forbiddenErrorCode',103);
    app.set('missingParamErrorMsg','Missing parameters, please provide all information required!');
    app.set('missingParamErrorCode',102);
    app.set('duplicateUserRecordMsg','Exist an user with same email!');
    app.set('duplicateRecordCode',106);
    app.set('wrongParamErrorMsg','Please check parameters sent!');
    app.set('wrongParamErrorCode',107);
    app.set('userDeleteErrorMsg','User cannot be created which is not belog to a group');
    app.set('userDeleteErrorCode',108);
}