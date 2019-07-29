'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('User', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(30), allowNull: false, comment: '用户名' },
    role: { type: STRING(30), allowNull: false, comment: '权限组' },
  }, {
    underscored: true,
    paranoid: true,
  });

  return User;
};
