'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('sms', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      bill_id: {
        type: INTEGER,
        allowNull: false,
        comment: '提单号',
        references: {
          model: 'bills',
          key: 'id',
        },
      },
      driver_name: { type: STRING(10), allowNull: false, comment: '司机姓名' },
      mobile_number: {
        type: STRING(20),
        allowNull: false,
        comment: '司机电话',
      },
      content: { type: STRING, allowNull: false, comment: '短信内容' },
      vehicle_number: { type: STRING(10), allowNull: false, comment: '车牌号' },
      sender: { type: STRING(10), allowNull: false, comment: '发送人' },
      deleted_at: { type: DATE, defaultValue: Sequelize.NOW },
      created_at: { type: DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: DATE, defaultValue: Sequelize.NOW },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('sms');
  },
};
