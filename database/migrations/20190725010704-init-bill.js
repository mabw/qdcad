'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, DATEONLY, STRING, ENUM, FLOAT, TEXT, BOOLEAN } = Sequelize;
    await queryInterface.createTable('Bills', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      bill: { type: STRING(30), allowNull: false, comment: '提单号' },
      vessel: { type: STRING(50), allowNull: false, comment: '英文船名' },
      vessel_cn: { type: STRING(50), comment: '中文船名' },
      voyage: { type: STRING(10), allowNull: false, comment: '航次' },
      shipping_schedule: { type: STRING(30), comment: '船期' },
      yard: { type: STRING(50), allowNull: false, comment: '场站' },
      arrival: { type: STRING(50), allowNull: false, comment: '终点' },
      direction: { type: ENUM('进口', '出口'), allowNull: false, comment: '进出口类型' },
      assign_time: { type: DATEONLY, allowNull: false, comment: '派车时间' },
      arrival_time: { type: DATEONLY, allowNull: false, comment: '到厂时间' },
      vehicle_number: { type: STRING(10), comment: '车号' },
      vehicle_driver: { type: STRING(10), comment: '司机名' },
      vehicle_owner: { type: STRING(50), comment: '车主' },
      client_name: { type: STRING(50), allowNull: false, comment: '客户名称' },
      container_spec: { type: STRING(10), allowNull: false, comment: '箱型' },
      freight_charge: { type: FLOAT, comment: '运费' },
      assignment_expense: { type: FLOAT, comment: '外派费' },
      prepaid_fee: { type: FLOAT, comment: '代垫费' },
      frozen_fee: { type: FLOAT, comment: '测温费' },
      mileage: { type: FLOAT, comment: '里程数' },
      port_fee: { type: FLOAT, comment: '港杂费' },
      traffic_fee: { type: FLOAT, comment: '路桥费' },
      luTongKa_expense: { type: FLOAT, comment: '鲁通卡费' },
      repairs_expense: { type: FLOAT, comment: '修理费' },
      oiler: { type: STRING(10), comment: '加油员' },
      fuel_amount: { type: FLOAT, comment: '加油量' },
      driver_commission: { type: FLOAT, comment: '司机报销' },
      operator: { type: STRING(10), allowNull: false, comment: '操作人' },
      memo: TEXT,
      is_bill_checked: { type: BOOLEAN, defaultValue: false, comment: '信息核对' },
      bill_checked_byUser: STRING(10),
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
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('Bills');
  },
};
