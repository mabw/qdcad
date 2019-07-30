'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class StatementController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Statement.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Statement.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { name, role } = ctx.request.body;
    const Statement = await ctx.model.Statement.create({ name, role });
    ctx.status = 201;
    ctx.body = Statement;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Statement = await ctx.model.Statement.findByPk(id);
    if (!Statement) {
      ctx.status = 404;
      return;
    }

    const { name, role } = ctx.request.body;
    await Statement.update({ name, role });
    ctx.body = Statement;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Statement = await ctx.model.Statement.findByPk(id);
    if (!Statement) {
      ctx.status = 404;
      return;
    }

    await Statement.destroy();
    ctx.status = 200;
  }
}

module.exports = StatementController;
