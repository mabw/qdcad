'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATEONLY, STRING } = Sequelize;
    await queryInterface.createTable('vessel', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      vessel_number: { type: STRING(10), allowNull: false, comment: '车牌号' },
      driver_name: { type: STRING(10), allowNull: false, comment: '司机姓名' },
      vessel_owner: { type: STRING(10), allowNull: false, comment: '车主' },
      trailer_number: { type: STRING(10), comment: '挂号车牌' },
      driver_mobile: { type: STRING(20), allowNull: false, comment: '司机电话' },
      insurance_date: { type: DATEONLY, comment: '保险到期时间' },
      annual_survey_date: { type: DATEONLY, comment: '年检时间' },
      ying_yun_date: { type: DATEONLY, comment: '营运时间' },
      driver_license_date: { type: DATEONLY, comment: '驾照年审时间' },
      driver_certificate_date: { type: DATEONLY, comment: '驾驶员资格证年审时间' },
    }, {
      modelName: 'vessel',
      timestamps: true,
      paranoid: true,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('vessel');
  },
};
