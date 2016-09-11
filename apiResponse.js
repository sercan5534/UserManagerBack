ApiResponse = function(code,msg,data){
    this.code = code;
    this.message = msg;
    this.data = data;
}

ApiResponse.prototype={
    code:null,
    message:'',
    data:null,
    getJson : function () {
        return { code: this.code, message:this.message,data:this.data }
    }
}