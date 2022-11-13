const { User } = require("../models/user");
const { RegisterValidator } = require("../validators/validator");
const Router = require("koa-router");
const router = new Router({
  prefix: "/user",
});

// 注册
router.post("/register", async (ctx) => {
  // 接收参数 参数校验
  // username password 
  const v = await new RegisterValidator().validate(ctx);

  const user = {
    email: v.get("body.email"),
    username: v.get("body.username"),
    password: v.get("body.password"),
  };
  console.log("user", user);
  const res = await User.create(user);
  throw new global.errs.Success()
});


// 登陆 token jwt
// token 无意义的随机字符串
// jwt 可以携带参数  uid

module.exports = router;
