/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1563955654798_9491';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  config.sequelize = {
    dialect: 'postgres',
    username: 'marvin',
    password: '123456',
    host: '127.0.0.1',
    port: 5432,
    database: 'qdcad_development',
  };

  return {
    ...config,
  };
};
