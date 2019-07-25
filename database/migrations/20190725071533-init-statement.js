'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, TEXT, STRING, DATE, ENUM, DECIMAL } = Sequelize;
    await queryInterface.createTable('statement', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      client_name: STRING(50),
      type: ENUM('pay', 'collect'),
      amount: DECIMAL,
      created_at: DATE,
      memo: TEXT,
      bill_id: { type: INTEGER },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('statement');
  },
};
