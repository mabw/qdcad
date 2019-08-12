'use strict';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Controller = require('egg').Controller;

class CheckBillController extends Controller {
  async index() {
    const ctx = this.ctx;
    const bill = ctx.params.bill;
    ctx.body = await ctx.model.Bill.findAndCountAll({
      where: {
        bill: {
          [Op.eq]: bill.toUpperCase(),
        },
      },
    });
  }
}

module.exports = CheckBillController;
