const { LinValidator, Rule } = require("../../core/lin-validator-v2");

const { User } = require("../models/user");


const { LoginType }  = require('../../lib/enum')
/**
  为什么不把lin-validator 做成中间件
  eg:  router.post("/register",  new RegisterValidator() ,  async (ctx) => {})   这样使用

  原因：中间件是静态的，只有全局初始化的时候，会new一个实例， 而业务代码中进行new， 请求10次， 会生成10个实例

  全局一个validator 
  // 1.  validator.a = 1
  // 2.  validator.b = 2
  // 第三个请求读取的时候是2 ， 因为a被第二个请求修改了
  
 * */

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super();
    this.id = [new Rule("isInt", "需要是正整数", { min: 1 })];
  }
}

// 注册校验
class RegisterValidator extends LinValidator {
  constructor() {
    super();
    this.email = [new Rule("isEmail", "不符合email规范")];
    this.username = [
      new Rule("isLength", "账号至少6个字符，最多32个字符", {
        min: 6,
        max: 32,
      }),
    ];
    this.password = [
      new Rule("isLength", "密码至少6个字符，最多32个字符", {
        min: 6,
        max: 32,
      }),
      // 自定义正则表达式校验
      // new Rule("matches", "", "(此处正则表达式)"),
    ];
  }

  async validateEmail(vals) {
    const email = vals.body.email;
    const username = vals.body.username;
    // 
    const user = await User.findOne({
      where: {
        email: email,
        username:username
      },
    });
    if (user) {
      throw new Error("账号已存在");
    }
  }
}


// token 验证器
class TokenValidator extends LinValidator {
  constructor(){
    super()
    this.account = [
      new Rule('isLength','不符合账号规则',{
        min:4,
        max:32
      })
    ]
    // 是必须要传入的吗？
    // web 账号+密码  account + secret
    // 微信等 account
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength','至少6个字符',{
        min:6,
        max:128
      })
    ]
  }

    // type 枚举
    validateLoginType(vals){
      if(!vals.body.type){
        throw new Error('type是必须参数')
      }
      if(!LoginType.isThisType(vals.body.type)){
        throw new Error('type参数不合法')
      }
    }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator
};
