const basicAuth  = require('basic-auth');
const jwt = require('jsonwebtoken')

class Auth {
    constructor(level){
        this.level = level || 1; 
        Auth.USER = 8;
        Auth.ADMIN = 16;
        Auth.SUERP_ADMIN = 32;
    }
    get m(){
        return  async (ctx,next)=>{
            // token 检测
            // token 开发者 传递令牌
            // HTTP 规定身份验证机制  HTTP BasicAuth
            // ctx.req : 原生node.js 的req参数    ctx.request : koa 封装后的请求参数
            const userToken =  basicAuth(ctx.req);
            let errMsg = 'token不合法'
            if(!userToken || !userToken.name){
                throw new global.errs.Forbidden(errMsg)
            }
            try {
                var decode =   jwt.verify(userToken.name,global.config.security.secretKey)
            } catch (error) {
                if(error.name == 'TokenExpiredError'){
                    errMsg = 'token已过期'   
                }
                throw new global.errs.Forbidden(errMsg)
            }

            if(decode.scope < this.level){
                errMsg = '权限不足' 
                throw new global.errs.Forbidden(errMsg)
            }

            // uid, scope
            ctx.auth = {
                uid : decode.uid,
                scope : decode.scope 
            }
            
            await next()
        }
    }
}

module.exports = {
    Auth
}
