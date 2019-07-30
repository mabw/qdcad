'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.resources('users', '/users', controller.users);
  router.resources('bills', '/bills', controller.bills);
  router.resources('carriages', '/carriages', controller.carriages);
  router.resources('smss', '/smss', controller.smss);
  router.resources('statements', '/statements', controller.statements);
  router.resources('vessels', '/vessels', controller.vessels);
};
