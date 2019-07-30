'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class SmsController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Sms.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Sms.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { name, role } = ctx.request.body;
    const Sms = await ctx.model.Sms.create({ name, role });
    ctx.status = 201;
    ctx.body = Sms;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Sms = await ctx.model.Sms.findByPk(id);
    if (!Sms) {
      ctx.status = 404;
      return;
    }

    const { name, role } = ctx.request.body;
    await Sms.update({ name, role });
    ctx.body = Sms;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Sms = await ctx.model.Sms.findByPk(id);
    if (!Sms) {
      ctx.status = 404;
      return;
    }

    await Sms.destroy();
    ctx.status = 200;
  }
}

module.exports = SmsController;
