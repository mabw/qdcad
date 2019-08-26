'use strict';

const Controller = require('egg').Controller;

class JsonBillInfoController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { yard, bill } = ctx.params;
    ctx.body = await ctx.service.jsonBillInfo[yard](bill);
  }
}

module.exports = JsonBillInfoController;
