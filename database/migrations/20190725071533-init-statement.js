'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, TEXT, STRING, DECIMAL, DATE } = Sequelize;
    await queryInterface.createTable('statements', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      client_name: { type: STRING(50), allowNull: false, comment: '客户名称' },
      type: { type: STRING(10), allowNull: false, comment: '收付款标识' },
      amount: { type: DECIMAL, allowNull: false, comment: '发生金额' },
      memo: TEXT,
      bill_id: {
        type: INTEGER,
        comment: '提单号',
        references: {
          model: 'bills',
          key: 'id',
        },
      },
      deleted_at: { type: DATE, defaultValue: Sequelize.NOW },
      created_at: { type: DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: DATE, defaultValue: Sequelize.NOW },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('statements');
  },
};
