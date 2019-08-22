'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATEONLY, STRING, DATE } = Sequelize;
    await queryInterface.createTable('vehicles', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      vehicle_number: { type: STRING(10), allowNull: false, comment: '车牌号' },
      driver_name: { type: STRING(10), allowNull: false, comment: '司机姓名' },
      vehicle_owner: { type: STRING(10), allowNull: false, comment: '车主' },
      trailer_number: { type: STRING(10), comment: '挂号车牌' },
      driver_mobile: {
        type: STRING(20),
        allowNull: false,
        comment: '司机电话',
      },
      insurance_date: { type: DATEONLY, comment: '保险到期时间' },
      annual_survey_date: { type: DATEONLY, comment: '年检时间' },
      ying_yun_date: { type: DATEONLY, comment: '营运时间' },
      driver_license_date: { type: DATEONLY, comment: '驾照年审时间' },
      driver_certificate_date: {
        type: DATEONLY,
        comment: '驾驶员资格证年审时间',
      },
      deleted_at: { type: DATE, defaultValue: Sequelize.NOW },
      created_at: { type: DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: DATE, defaultValue: Sequelize.NOW },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('vehicles');
  },
};
