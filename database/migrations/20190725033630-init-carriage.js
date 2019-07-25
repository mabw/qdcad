'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, DATEONLY, STRING, FLOAT, TEXT, BOOLEAN } = Sequelize;
    await queryInterface.createTable('carriage', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      bill_id: { type: INTEGER },
      departure: STRING(50),
      arrival: STRING(50),
      assign_time: DATEONLY,
      arrival_time: DATEONLY,
      client_id: STRING(50),
      carriage_name: STRING(50),
      carriage_weight: FLOAT,
      carriage_price_per_ton: FLOAT,
      freight_charge: FLOAT,
      assignment_expense: FLOAT,
      prepaid_fee: FLOAT,
      mileage: FLOAT,
      operator: STRING(10),
      memo: TEXT,
      is_deleted: BOOLEAN,
      is_checked: BOOLEAN,
      is_paid: BOOLEAN,
      is_collected: BOOLEAN,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('bill');
  },
};
