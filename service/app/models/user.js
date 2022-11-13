// 加密的npm包
const bcrypt = require('bcryptjs')

const { sequelize } = require("../../core/db");

const { Sequelize, Model } = require("sequelize");

class User extends Model {
    static async verifyUserPassword(username,plainPassword){
        const user = await User.findOne({
            where:{ 
                username:username
            }
        })
        console.log('username',username,plainPassword,user.password)
        if(!user){
            throw new global.errs.NotFound('用户不存在')
        }
        // 使用bcrypt判断用户输入的密码是否相等 plainPassword
        const correct = bcrypt.compareSync(plainPassword,user.password)
        if(!correct){
            throw new global.errs.AuthFailed('密码不正确')
        }
        return user

    }

}
//  sequelize 不设置id，会自动设置id为主键
User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username:{
        type:Sequelize.STRING,
        unique: true, //unique 唯一
    },
    password: {
        type:Sequelize.STRING,
        set(val){
            // 生成一个盐
            const slat = bcrypt.genSaltSync(10)
            // 生成一个密码
            const psw = bcrypt.hashSync(val,slat)
            this.setDataValue('password',psw)
        }
    },
    email: {
      type: Sequelize.STRING(128),
      unique: true, //unique 唯一
    },
    nickname:Sequelize.STRING(128),
    openid: {
      type: Sequelize.STRING(64),
      unique: true,
    },
  },
  {
    sequelize,
    // tableName:'user'  会将users表重命名为user表名， 常用语数据库迁移
  }
);

module.exports = { User };
