class Result{

  constructor(code,message,data){
    this.code = code;
    this.message = message;
    this.data = data;
  }

}

class ResultCode{
  static SUCCESS = 200
  static FAIL = 400
}

class ResultFactory{

  static buildSuccessResult(data){
    return new Result(ResultCode.SUCCESS,"成功",data);
  }

  static buildFailResult(message){
    return new Result(ResultCode.FAIL,message,null);
  }
}

module.exports = ResultFactory