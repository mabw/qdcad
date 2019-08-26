'use strict';

const Controller = require('egg').Controller;

class RawBillInfoController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { yard, bill } = ctx.params;
    ctx.body = await ctx.service.rawBillInfo[yard](bill);
  }
}

module.exports = RawBillInfoController;
