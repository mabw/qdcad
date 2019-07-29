'use strict';
module.exports = (sequelize, DataTypes) => {
  const { STRING, INTEGER } = DataTypes;
  const Sms = sequelize.define('Sms', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    billId: {
      type: INTEGER, allowNull: false, comment: '提单号', references: {
        model: 'bill',
        key: 'id',
      },
    },
    driverName: { type: STRING(10), allowNull: false, comment: '司机姓名' },
    mobileNumber: { type: STRING(20), allowNull: false, comment: '司机电话' },
    content: { type: STRING, allowNull: false, comment: '短信内容' },
    vesselNumber: { type: STRING(10), allowNull: false, comment: '车牌号' },
    sender: { type: STRING(10), allowNull: false, comment: '发送人' },
  }, {
    underscored: true,
    paranoid: true,
  });

  Sms.associate = function(models) {
    Sms.belongsTo(models.Bill);
  };
  return Sms;
};
