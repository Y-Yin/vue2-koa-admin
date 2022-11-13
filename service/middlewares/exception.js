const { HttpException } = require("../core/http-exception");

// 全局异常捕捉
const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // 开发环境 生产环境
    // 开发环境， 并且不是一个HttpException
    const isHttpException = error instanceof HttpException;
    const isDev = global.config.environment === "dev";
    if (isDev && !isHttpException) {
      throw error;
    }
    if (isHttpException) {
      ctx.body = {
        msg: error.msg || "",
        code: error.code || "",
        request: `${ctx.method}  ${ctx.path}`,
      };
    } else {
      console.log("ctx", ctx);
      ctx.body = {
        msg: "服务内部异常",
        code: 999,
        request: `${ctx.method}  ${ctx.path}`,
      };
    }
  }
};

module.exports = catchError;
