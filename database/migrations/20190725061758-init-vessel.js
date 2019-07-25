'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, DATEONLY, STRING } = Sequelize;
    await queryInterface.createTable('vessel', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      vessel_number: STRING(10),
      driver_name: STRING(10),
      vessel_owner: STRING(10),
      trailer_number: STRING(10),
      driver_mobile: STRING(20),
      insurance_date: DATEONLY,
      annual_survey_date: DATEONLY,
      ying_yun_date: DATEONLY,
      driver_license_date: DATEONLY,
      driver_certificate_date: DATEONLY,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('vessel');
  },
};
