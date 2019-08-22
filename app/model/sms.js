'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Sms = app.model.define(
    'Sms',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      billId: {
        type: INTEGER,
        allowNull: false,
        comment: '提单号',
        references: {
          model: 'Bill',
          key: 'id',
        },
      },
      driverName: { type: STRING(10), allowNull: false, comment: '司机姓名' },
      mobileNumber: { type: STRING(20), allowNull: false, comment: '司机电话' },
      content: { type: STRING, allowNull: false, comment: '短信内容' },
      vehicleNumber: { type: STRING(10), allowNull: false, comment: '车牌号' },
      sender: { type: STRING(10), allowNull: false, comment: '发送人' },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );

  Sms.prototype.associate = function() {
    app.model.Sms.belongsTo(
      app.model.Bill(app.model.Bill, { as: 'bill', foreignKey: 'bill_id' })
    );
  };

  return Sms;
};
