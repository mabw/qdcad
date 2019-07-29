'use strict';
module.exports = (sequelize, DataTypes) => {
  const { STRING, INTEGER, ENUM, DECIMAL, TEXT } = DataTypes;
  const Statement = sequelize.define('Statement', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    clientName: { type: STRING(50), allowNull: false, comment: '客户名称' },
    type: { type: ENUM('pay', 'collect'), allowNull: false, comment: '收付款标识' },
    amount: { type: DECIMAL, allowNull: false, comment: '发生金额' },
    memo: TEXT,
    billId: {
      type: INTEGER, comment: '提单号', references: {
        model: 'bill',
        key: 'id',
      },
    },
  }, {
    underscored: true,
    paranoid: true,
  });

  return Statement;
};
