'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('Users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING(30), allowNull: false },
      role: { type: STRING(30), allowNull: false },
      created_at: { type: DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: DATE, defaultValue: Sequelize.NOW },
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('Users');
  },
};
