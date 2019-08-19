'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Configuration = app.model.define(
    'Configuration',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      type: {
        type: STRING(30),
        allowNull: false,
      },
      content: { type: JSON, allowNull: false },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );

  return Configuration;
};
