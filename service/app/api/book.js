const Router = require("koa-router");
const router = new Router();

const { PositiveIntegerValidator } = require("../validators/validator");

router.post("/book/:id/latest", async (ctx, next) => {
  const path = ctx.params;
  const query = ctx.request.query;
  const headers = ctx.request.header;
  const body = ctx.request.body;

  const v = await new PositiveIntegerValidator().validate(ctx);
  // 验证器获取get参数
  // console.log("v", v.get("path.id", (parsed = false)));
  // 验证器获取post参数 可深层次数据   body.a.b
  console.log("v", v.get("body"));
  ctx.body = "success";
});

module.exports = router;
