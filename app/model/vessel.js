'use strict';
module.exports = (sequelize, DataTypes) => {
  const { STRING, INTEGER, DATEONLY } = DataTypes;
  const Vessel = sequelize.define('Vessel', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    vesselNumber: { type: STRING(10), allowNull: false, comment: '车牌号' },
    driverName: { type: STRING(10), allowNull: false, comment: '司机姓名' },
    vesselOwner: { type: STRING(10), allowNull: false, comment: '车主' },
    trailerNumber: { type: STRING(10), comment: '挂号车牌' },
    driverMobile: { type: STRING(20), allowNull: false, comment: '司机电话' },
    insuranceDate: { type: DATEONLY, comment: '保险到期时间' },
    annualSurveyDate: { type: DATEONLY, comment: '年检时间' },
    yingYunDate: { type: DATEONLY, comment: '营运时间' },
    driverLicenseDate: { type: DATEONLY, comment: '驾照年审时间' },
    driverCertificateDate: { type: DATEONLY, comment: '驾驶员资格证年审时间' },
  }, {
    underscored: true,
    paranoid: true,
  });

  return Vessel;
};
