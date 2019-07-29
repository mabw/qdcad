'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('sms', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      billId: {
        type: INTEGER, allowNull: false, comment: '提单号', references: {
          model: 'bill',
          key: 'id',
        },
      },
      driverName: { type: STRING(10), allowNull: false, comment: '司机姓名' },
      mobileNumber: { type: STRING(20), allowNull: false, comment: '司机电话' },
      content: { type: STRING, allowNull: false, comment: '短信内容' },
      vesselNumber: { type: STRING(10), allowNull: false, comment: '车牌号' },
      sender: { type: STRING(10), allowNull: false, comment: '发送人' },
    }, {
      modelName: 'sms',
      timestamps: true,
      paranoid: true,
      underscored: true,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('sms');
  },
};
