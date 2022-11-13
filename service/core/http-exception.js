class HttpException extends Error {
  constructor(msg = "服务器内部异常", code = 400) {
    super();
    this.code = code;
    this.msg = msg;
  }
}

class ParameterException extends HttpException {
  constructor(msg) {
    super();
    this.code = 400;
    this.msg = msg || "参数错误";
  }
}

class Success extends HttpException {
  constructor(msg) {
    super();
    this.code = 200;
    this.msg = msg || "success";
  }
}

class NotFound extends HttpException {
  constructor(msg) {
    super();
    this.code = 404;
    this.msg = msg || "资源未找到";
  }
}

class AuthFailed extends HttpException {
  constructor(msg) {
    super();
    this.code = 401;
    this.msg = msg || "授权失败";
  }
}

class Forbidden extends HttpException {
  constructor(msg) {
    super();
    this.code = 403;
    this.msg = msg || "禁止访问";
  }
}

class linkError extends HttpException {
  constructor(msg) {
    super();
    this.code = 400;
    this.msg = msg || "你已经点赞过";
  }
}

class DislikeError extends HttpException {
  constructor(msg) {
    super();
    this.code = 400;
    this.msg = msg || "你已取消点赞";
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success,
  NotFound,
  AuthFailed,
  Forbidden,
  linkError,
  DislikeError,
};
