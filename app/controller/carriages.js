'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class CarriageController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Carriage.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Carriage.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { name, role } = ctx.request.body;
    const Carriage = await ctx.model.Carriage.create({ name, role });
    ctx.status = 201;
    ctx.body = Carriage;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Carriage = await ctx.model.Carriage.findByPk(id);
    if (!Carriage) {
      ctx.status = 404;
      return;
    }

    const { name, role } = ctx.request.body;
    await Carriage.update({ name, role });
    ctx.body = Carriage;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Carriage = await ctx.model.Carriage.findByPk(id);
    if (!Carriage) {
      ctx.status = 404;
      return;
    }

    await Carriage.destroy();
    ctx.status = 200;
  }
}

module.exports = CarriageController;
