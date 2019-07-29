'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, JSON } = Sequelize;
    await queryInterface.createTable('configuration', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      type: { type: STRING(10), allowNull: false },
      content: { type: JSON, allowNull: false },
    }, {
      modelName: 'configuration',
      timestamps: true,
      paranoid: true,
      underscored: true,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('configuration');
  },
};
