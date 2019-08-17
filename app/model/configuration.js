'use strict';
module.exports = app => {
  const { ENUM, INTEGER } = app.Sequelize;
  const Configuration = app.model.define(
    'Configuration',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      type: {
        type: ENUM(
          'yard',
          'container_spec',
          'departure',
          'arrival',
          'yun_gang_tong',
          'client_name',
          'carriage_name'
        ),
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
