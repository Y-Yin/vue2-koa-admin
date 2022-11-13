const Router = require("koa-router");
//  使用 require-directory  自动注册路由
const requireDirectory = require("require-directory");

class InitManager {
  // static 修饰的静态方法，不会被实例集成，是能被类自己调用
  static initCore(app) {
    // 入口方法
    InitManager.app = app;
    InitManager.initLoadRouters();
    InitManager.loadHttpException();
    InitManager.laodConfig();
  }

  // 加载配置文件
  static laodConfig(path = "") {
    const configPath = path || process.cwd() + "/config/config.js";
    const config = require(configPath);
    global.config = config;
  }

  //  主动注册所有路由
  static initLoadRouters() {
    // process.cwd() 获取根目录的绝对路径
    const apiDirectory = `${process.cwd()}/app/api`;
    requireDirectory(module, apiDirectory, { visit: whenLoadModule });

    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
  }

  // 将所有error类型注册到node global上,供全局调用
  static loadHttpException() {
    const errors = require("./http-exception");
    global.errs = errors;
  }
}

module.exports = InitManager;
