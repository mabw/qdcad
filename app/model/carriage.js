'use strict';
module.exports = app => {
  const { STRING, INTEGER, DATEONLY, FLOAT, TEXT, BOOLEAN, DATE } = app.Sequelize;
  const Carriage = app.model.define('Carriage', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    billId: {
      type: INTEGER, allowNull: false, comment: '提单号', references: {
        model: 'Bill',
        key: 'id',
      },
    },
    departure: { type: STRING(50), allowNull: false, comment: '出发地点' },
    arrival: { type: STRING(50), allowNull: false, comment: '到达地点' },
    assignTime: { type: DATEONLY, allowNull: false, comment: '派车日期' },
    arrivalTime: { type: DATEONLY, allowNull: false, comment: '到厂日期' },
    clientName: { type: STRING(50), allowNull: false, comment: '客户名称' },
    carriageName: { type: STRING(50), allowNull: false, comment: '货物名称' },
    carriageWeight: { type: FLOAT, allowNull: false, comment: '货物重量' },
    carriagePricePerTon: { type: FLOAT, allowNull: false, comment: '每吨价格' },
    freightCharge: { type: FLOAT, comment: '运费' },
    assignmentExpense: { type: FLOAT, comment: '外派价格' },
    prepaidFee: { type: FLOAT, comment: '代垫费用' },
    mileage: { type: FLOAT, comment: '里程数' },
    operator: { type: STRING(10), allowNull: false, comment: '操作人' },
    memo: TEXT,
    isBillChecked: { type: BOOLEAN, defaultValue: false, comment: '信息核对' },
    billCheckedByUser: STRING(10),
    billCheckedAt: DATE,
    isPaymentChecked: { type: BOOLEAN, defaultValue: false, comment: '付款审核' },
    paymentCheckedByUser: STRING(10),
    paymentCheckedAt: DATE,
    isPaid: { type: BOOLEAN, defaultValue: false, comment: '已付款' },
    paidByUser: STRING(10),
    paidAt: DATE,
    isCollectedChecked: { type: BOOLEAN, defaultValue: false, comment: '收款审核' },
    collectedCheckedByUser: STRING(10),
    collectedCheckedAt: DATE,
    isCollected: { type: BOOLEAN, defaultValue: false, comment: '已收款' },
    collectedByUser: STRING(10),
    collectedAt: DATE,
    isDeleted: { type: BOOLEAN, defaultValue: false, comment: '是否已删除' },
  }, {
    underscored: true,
    paranoid: true,
  });

  Carriage.prototype.associate = function() {
    app.model.Carriage.belongsTo(app.model.Bill, { as: 'bills', foreignKey: 'bill_id' });
  };

  return Carriage;
};
