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
  security:{
    secretKey:'abcdefg',
    expiresIn:60*60
  }
};
