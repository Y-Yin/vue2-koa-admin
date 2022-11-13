const Router = require("koa-router");
const router = new Router({
  prefix:'/classic'
});

// Auth中间件
const { Auth }  = require('../../middlewares/auth')

router.post("/latest", new Auth().m, async (ctx, next) => {
  // 权限 复杂
  // 限制 token 角色 
  // 普通用户 管理员
  // 权限分级 scope
  ctx.body = ctx.auth.uid
});

module.exports = router;
