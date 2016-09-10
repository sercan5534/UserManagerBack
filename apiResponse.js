ApiResponse = function(code,msg,data){
    this.code = code;
    this.msg = msg;
    this.data = data;
}

ApiResponse.prototype={
    code:null,
    msg:'',
    data:null,
    getJson : function () {
        return { code: this.code, message:this.msg,data:this.data }
    }
}