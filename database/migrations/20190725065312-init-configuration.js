'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, ENUM, JSON, DATE } = Sequelize;
    await queryInterface.createTable('configurations', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      type: {
        type: ENUM(
          'yard',
          'container_spec',
          'departure',
          'arrival',
          'yun_gang_tong',
          'client_name'
        ),
        allowNull: false,
      },
      content: { type: JSON, allowNull: false },
      deleted_at: { type: DATE, defaultValue: Sequelize.NOW },
      created_at: { type: DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: DATE, defaultValue: Sequelize.NOW },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('configurations');
  },
};
