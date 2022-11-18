const util = require('util')
const axios = require('axios')
const { User } = require('../models/user')
const { generateToken } = require('../../core/util')
const {Auth} = require('../../middlewares/auth')
class WXManager {
    static async codeToToken(code){
        // code 小程序生成 
        // code 
        // appid appsecret
        const url = util.format(
            global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,
            code
        )
        const  result = await axios.get(url)
        if(result.status != 200){
            throw new global.errs.AuthFailed('openid 获取失败')
        }
        if(result.data.errcode !== 0){
            throw new global.errs.AuthFailed(`获取失败，errcode:${result.data.errcode}`)
        }
        let user = await User.getUserByOpenid(result.data.openid)
        if(!user){
            user = await User.registerByOpenid(result.data.openid)
        }

        return generateToken(user.id,Auth.USER)
    }
}
module.exports = {
    WXManager
}