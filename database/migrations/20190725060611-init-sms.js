'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('sms', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      bill_id: { type: INTEGER },
      driver_name: STRING(10),
      mobile_number: STRING(20),
      content: STRING,
      vessel_number: STRING(10),
      sender: STRING(10),
      created_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('bill');
  },
};
