'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class BillController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Bill.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Bill.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { name, role } = ctx.request.body;
    const Bill = await ctx.model.Bill.create({ name, role });
    ctx.status = 201;
    ctx.body = Bill;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Bill = await ctx.model.Bill.findByPk(id);
    if (!Bill) {
      ctx.status = 404;
      return;
    }

    const { name, role } = ctx.request.body;
    await Bill.update({ name, role });
    ctx.body = Bill;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Bill = await ctx.model.Bill.findByPk(id);
    if (!Bill) {
      ctx.status = 404;
      return;
    }

    await Bill.destroy();
    ctx.status = 200;
  }
}

module.exports = BillController;
