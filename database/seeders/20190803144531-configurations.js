'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'configurations',
      [
        {
          type: 'yard',
          content:
            '{"data":[{"name":"中创","identity":"zhongChuang",order:"4"},{"name":"捷丰","identity":"jieFeng",order:"3"},{"name":"港联欣","identity":"gangLianXin",order:"5"},{"name":"中外运","identity":"zhongWaiYun",order:"2"},{"name":"神州","identity":"shenZhou",order:"0"},{"name":"港联海","identity":"gangLianHai",order:"0"},{"name":"胜狮","identity":"shengShi",order:"0"},{"name":"港陆","identity":"gangLu",order:"0"},{"name":"长荣","identity":"changRong",order:"0"},{"name":"港联华","identity":"gangLianHua",order:"0"},{"name":"大亚","identity":"daYa",order:"1"}]}',
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
        {
          type: 'carriage_name',
          content: '{"data":["冻丸子"]}',
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('configurations', null, {});
  },
};
