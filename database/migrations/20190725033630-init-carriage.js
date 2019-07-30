'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATEONLY, DATE, STRING, FLOAT, TEXT, BOOLEAN } = Sequelize;
    await queryInterface.createTable('carriages', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      bill_id: {
        type: INTEGER, allowNull: false, comment: '提单号', references: {
          model: 'bills',
          key: 'id',
        },
      },
      departure: { type: STRING(50), allowNull: false, comment: '出发地点' },
      arrival: { type: STRING(50), allowNull: false, comment: '到达地点' },
      assign_time: { type: DATEONLY, allowNull: false, comment: '派车日期' },
      arrival_time: { type: DATEONLY, allowNull: false, comment: '到厂日期' },
      client_name: { type: STRING(50), allowNull: false, comment: '客户名称' },
      carriage_name: { type: STRING(50), allowNull: false, comment: '货物名称' },
      carriage_weight: { type: FLOAT, allowNull: false, comment: '货物重量' },
      carriage_price_per_ton: { type: FLOAT, allowNull: false, comment: '每吨价格' },
      freight_charge: { type: FLOAT, comment: '运费' },
      assignment_expense: { type: FLOAT, comment: '外派价格' },
      prepaid_fee: { type: FLOAT, comment: '代垫费用' },
      mileage: { type: FLOAT, comment: '里程数' },
      operator: { type: STRING(10), allowNull: false, comment: '操作人' },
      memo: TEXT,
      is_bill_checked: { type: BOOLEAN, defaultValue: false, comment: '信息核对' },
      bill_checked_by_user: STRING(10),
      bill_checked_at: DATE,
      is_payment_checked: { type: BOOLEAN, defaultValue: false, comment: '付款审核' },
      payment_checked_by_user: STRING(10),
      payment_checked_at: DATE,
      is_paid: { type: BOOLEAN, defaultValue: false, comment: '已付款' },
      paid_by_user: STRING(10),
      paid_at: DATE,
      is_collected_checked: { type: BOOLEAN, defaultValue: false, comment: '收款审核' },
      collected_checked_by_user: STRING(10),
      collected_checked_at: DATE,
      is_collected: { type: BOOLEAN, defaultValue: false, comment: '已收款' },
      collected_by_user: STRING(10),
      collected_at: DATE,
      is_deleted: { type: BOOLEAN, defaultValue: false, comment: '是否已删除' },
      deleted_at: { type: DATE, defaultValue: Sequelize.NOW },
      created_at: { type: DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: DATE, defaultValue: Sequelize.NOW },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('carriages');
  },
};
