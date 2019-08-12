'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.resources('users', '/api/v1/users', controller.users);
  router.resources('bills', '/api/v1/bills', controller.bills);
  router.resources('carriages', '/api/v1/carriages', controller.carriages);
  router.resources('sms', '/api/v1/sms', controller.smss);
  router.resources('statements', '/api/v1/statements', controller.statements);
  router.resources('vessels', '/api/v1/vessels', controller.vessels);
  router.resources(
    'configurations',
    '/api/v1/configurations',
    controller.configurations
  );
  router.get('/api/v1/check-bill/:bill', controller.checkBill.index);
};
