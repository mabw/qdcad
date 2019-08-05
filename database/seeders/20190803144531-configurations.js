'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'configurations',
      [
        {
          type: 'yard',
          content:
            '{"data":[{"name":"中创","identity":"zhong_chuang"},{"name":"捷丰","identity":"jie_feng"}]}',
        },
        {
          type: 'container_spec',
          content:
            '{"data":[{"size": "20", "type":"HC", "isFrozen": true}, {"size": "40", "type":"HC", "isFrozen": true}, {"size": "40", "type":"GP", "isFrozen": false}, {"size": "40", "type":"RH", "isFrozen": true}]}',
        },
        {
          type: 'departure',
          content: '{"data": ["黄岛"]}',
        },
        {
          type: 'arrival',
          content: '{"data":["凤祥"]}',
        },
        {
          type: 'yun_gang_tong',
          content: '{"data": {"user":"13199999999","password":"4433323"}}',
        },
        {
          type: 'client_name',
          content: '{"data":["祥光"]}',
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('configurations', null, {});
  },
};
