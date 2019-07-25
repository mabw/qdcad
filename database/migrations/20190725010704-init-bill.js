'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, DATEONLY, STRING, ENUM, FLOAT, TEXT, BOOLEAN } = Sequelize;
    await queryInterface.createTable('bill', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      bill: STRING(30),
      vessel: STRING(50),
      vessel_cn: STRING(50),
      voyage: STRING(10),
      shipping_schedule: STRING(30),
      yard: STRING(50),
      arrival: STRING(50),
      direction: ENUM('进口', '出口'),
      assign_time: DATEONLY,
      arrival_time: DATEONLY,
      vehicle_number: STRING(10),
      vehicle_driver: STRING(10),
      vehicle_owner: STRING(50),
      client_name: STRING(50),
      container_spec: STRING(10),
      freight_charge: FLOAT,
      assignment_expense: FLOAT,
      prepaid_fee: FLOAT,
      frozen_fee: FLOAT,
      mileage: FLOAT,
      port_fee: FLOAT,
      traffic_fee: FLOAT,
      lu_tong_ka_expense: FLOAT,
      repairs_expense: FLOAT,
      oiler: STRING(10),
      fuel_amount: FLOAT,
      driver_commission: FLOAT,
      operator: STRING(10),
      memo: TEXT,
      is_deleted: BOOLEAN,
      is_bill_checked: BOOLEAN,
      bill_checked_by_user: STRING(10),
      bill_checked_at: DATE,
      is_payment_checked: BOOLEAN,
      payment_checked_by_user: STRING(10),
      payment_checked_at: DATE,
      is_paid: BOOLEAN,
      paid_by_user: STRING(10),
      paid_at: DATE,
      is_collected_checked: BOOLEAN,
      collected_checked_by_user: STRING(10),
      collected_checked_at: DATE,
      is_collected: BOOLEAN,
      collected_by_user: STRING(10),
      collected_at: DATE,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('bill');
  },
};
