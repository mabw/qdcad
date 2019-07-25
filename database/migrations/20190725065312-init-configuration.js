'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, JSON } = Sequelize;
    await queryInterface.createTable('configuration', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      type: STRING(10),
      content: JSON,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('configuration');
  },
};
