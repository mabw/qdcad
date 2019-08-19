'use strict';
module.exports = app => {
  const {
    STRING,
    INTEGER,
    DATEONLY,
    FLOAT,
    TEXT,
    BOOLEAN,
    DATE,
  } = app.Sequelize;
  const Bill = app.model.define(
    'Bill',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      bill: { type: STRING(30), allowNull: false, comment: '提单号' },
      vessel: { type: STRING(50), allowNull: false, comment: '英文船名' },
      vesselCn: { type: STRING(50), comment: '中文船名' },
      voyage: { type: STRING(10), allowNull: false, comment: '航次' },
      shippingSchedule: { type: DATEONLY, comment: '船期' },
      yard: { type: STRING(50), allowNull: false, comment: '场站' },
      arrival: { type: STRING(50), allowNull: false, comment: '终点' },
      measureDock: {
        type: STRING(10),
        comment: '测温码头',
      },
      direction: {
        type: STRING(10),
        allowNull: false,
        comment: '进出口类型',
      },
      assignTime: { type: DATEONLY, allowNull: false, comment: '派车时间' },
      arrivalTime: { type: DATEONLY, allowNull: false, comment: '到厂时间' },
      vehicleNumber: { type: STRING(10), comment: '车号' },
      vehicleDriver: { type: STRING(10), comment: '司机名' },
      vehicleOwner: { type: STRING(50), comment: '车主' },
      clientName: { type: STRING(50), allowNull: false, comment: '客户名称' },
      containerSpec: { type: STRING(10), allowNull: false, comment: '箱型' },
      freightCharge: { type: FLOAT, comment: '运费' },
      assignmentExpense: { type: FLOAT, comment: '外派费' },
      prepaidFee: { type: FLOAT, comment: '代垫费' },
      frozenFee: { type: FLOAT, comment: '测温费' },
      mileage: { type: FLOAT, comment: '里程数' },
      portFee: { type: FLOAT, comment: '港杂费' },
      trafficFee: { type: FLOAT, comment: '路桥费' },
      luTongKaExpense: { type: FLOAT, comment: '鲁通卡费' },
      repairsExpense: { type: FLOAT, comment: '修理费' },
      oiler: { type: STRING(10), comment: '加油员' },
      fuelAmount: { type: FLOAT, comment: '加油量' },
      driverCommission: { type: FLOAT, comment: '司机报销' },
      operator: { type: STRING(10), allowNull: false, comment: '操作人' },
      memo: TEXT,
      isBillChecked: {
        type: BOOLEAN,
        defaultValue: false,
        comment: '信息核对',
      },
      billCheckedByUser: STRING(10),
      billCheckedAt: DATE,
      isPaymentChecked: {
        type: BOOLEAN,
        defaultValue: false,
        comment: '付款审核',
      },
      paymentCheckedByUser: STRING(10),
      paymentCheckedAt: DATE,
      isPaid: { type: BOOLEAN, defaultValue: false, comment: '已付款' },
      paidByUser: STRING(10),
      paidAt: DATE,
      isCollectedChecked: {
        type: BOOLEAN,
        defaultValue: false,
        comment: '收款审核',
      },
      collectedCheckedByUser: STRING(10),
      collectedCheckedAt: DATE,
      isCollected: { type: BOOLEAN, defaultValue: false, comment: '已收款' },
      collectedByUser: STRING(10),
      collectedAt: DATE,
      isDeleted: { type: BOOLEAN, defaultValue: false, comment: '是否已删除' },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );

  Bill.prototype.associate = function() {
    app.model.Bill.hasMany(app.model.Carriage, { as: 'carriages' });
    app.model.Bill.hasMany(app.model.Sms, { as: 'smss' });
    app.model.Bill.hasMany(app.model.Statement, { as: 'statements' });
  };

  return Bill;
};
