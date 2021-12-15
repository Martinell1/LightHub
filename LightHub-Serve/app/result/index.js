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

  static buildSuccessResult(message='成功',data){
    return new Result(ResultCode.SUCCESS,message,data);
  }

  static buildFailResult(message){
    return new Result(ResultCode.FAIL,message,null);
  }
}

module.exports = ResultFactory