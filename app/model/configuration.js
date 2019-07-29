'use strict';
module.exports = (sequelize, DataTypes) => {
  const { STRING, INTEGER } = DataTypes;
  const Configuration = sequelize.define('Configuration', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: STRING(10), allowNull: false },
    content: { type: JSON, allowNull: false },
  }, {
    underscored: true,
    paranoid: true,
  });

  return Configuration;
};
