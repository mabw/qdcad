'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class VesselController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Vessel.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Vessel.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { name, role } = ctx.request.body;
    const Vessel = await ctx.model.Vessel.create({ name, role });
    ctx.status = 201;
    ctx.body = Vessel;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Vessel = await ctx.model.Vessel.findByPk(id);
    if (!Vessel) {
      ctx.status = 404;
      return;
    }

    const { name, role } = ctx.request.body;
    await Vessel.update({ name, role });
    ctx.body = Vessel;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Vessel = await ctx.model.Vessel.findByPk(id);
    if (!Vessel) {
      ctx.status = 404;
      return;
    }

    await Vessel.destroy();
    ctx.status = 200;
  }
}

module.exports = VesselController;
