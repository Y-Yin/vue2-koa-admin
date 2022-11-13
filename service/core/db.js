const { Sequelize } = require("sequelize");
const { dbName, host, port, user, password } =
  require("../config/config").database;
const sequelize = new Sequelize(dbName, user, password, {
  dialect: "mysql",
  host,
  port,
  logging: false, // 控制台打印sql语句
  timezone: "+08:00",
  define: {
    // create_time  update_time  delete_time
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    underscored: false,
  },
});

// force: true 重新创建表结构（缺点：会删除表里的数据）
sequelize.sync({
  force: false,
});
 
module.exports = { 
  sequelize,
};
