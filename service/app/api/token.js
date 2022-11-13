const Router = require("koa-router");
const router = new Router({
  prefix: "/token",
});
const { LoginType}  = require('../../lib/enum')
const { User } = require('../models/user')
const { TokenValidator } = require('../validators/validator')
// Auth中间件
const { Auth }  = require('../../middlewares/auth')

const { generateToken }  = require('../../core/util')

router.post('/',async (ctx)=>{
    const v = await new TokenValidator().validate(ctx)
    const type = Number(v.get('body.type')) 
    // 
    let token ='';
    // 根据不同的登陆type 进行不同的处理
    switch(type){
        case LoginType.USER_PHONE : 
        token = await userNameLogin(v.get('body.account'),v.get('body.secret'))
        break;
        case LoginType.USER_MINI_PROGRAM :   
        break;
        default:
            throw new global.errs.ParameterException('没有对应的处理函数')
    }

    ctx.body = token
})

async function userNameLogin(account,secret){
   const user =  await User.verifyUserPassword(account,secret);
   return  generateToken(user.id,Auth.USER)

}


module.exports = router