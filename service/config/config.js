module.exports = {
  // prod   dev
  environment: "dev",
  database: {
    dbName: "koa",
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
  },
  security: {
    secretKey: "abcdefg",
    expiresIn: 60 * 60,
  },
  wx: {
    appId: "wx255b277b1d0bd10c",
    appSecret: "0fa7d89e86f40236df03130dcf1c507a",
    loginUrl:
      "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code",
  },
};
