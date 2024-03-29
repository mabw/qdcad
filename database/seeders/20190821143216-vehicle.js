'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'vehicles',
      [
        {
          vehicle_number: 'LBD2933',
          driver_name: '马炳文',
          vehicle_owner: '畅安达',
          driver_mobile: '13188986322',
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('vehicles', null, {});
  },
};
