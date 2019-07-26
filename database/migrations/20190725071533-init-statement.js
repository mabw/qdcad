'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, TEXT, STRING, ENUM, DECIMAL } = Sequelize;
    await queryInterface.createTable('statement', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      clientName: { type: STRING(50), allowNull: false, comment: '客户名称' },
      type: { type: ENUM('pay', 'collect'), allowNull: false, comment: '收付款标识' },
      amount: { type: DECIMAL, allowNull: false, comment: '发生金额' },
      memo: TEXT,
      billId: {
        type: INTEGER, comment: '提单号', references: {
          tableName: 'bill',
          key: 'id',
        },
      },
    }, {
      modelName: 'statement',
      timestamps: true,
      paranoid: true,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('statement');
  },
};
