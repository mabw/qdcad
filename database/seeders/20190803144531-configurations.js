'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'configurations',
      [
        {
          type: 'yard',
          content:
            '[{"name": "中创", "identity":"zhong_chuang"}, {"name": "捷丰", "identity":"jie_feng"}]',
        },
        {
          type: 'container_spec',
          content:
            '[{"size": "20", "type":"HC", "isFrozen": true}, {"size": "40", "type":"HC", "isFrozen": true}, {"size": "40", "type":"GP", "isFrozen": false}, {"size": "40", "type":"RH", "isFrozen": true}]',
        },
        {
          type: 'departure',
          content: '["黄岛"]',
        },
        {
          type: 'arrival',
          content: '["凤祥"]',
        },
        {
          type: 'yun_gang_tong',
          content: '{"user":"13199999999", "password":"123123123"}',
        },
        {
          type: 'client_name',
          content: '["祥光"]',
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('configurations', null, {});
  },
};
